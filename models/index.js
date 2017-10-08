/**
 * Created by mtenrero on 6/12/16.
 */
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mariadb", // or 'sqlite', 'postgres', 'mariadb'
    port:    process.env.DB_PORT || 3306,
    host: process.env.DB_HOST,
    define: {
        timestamps: false,
        timezone: '+01:00'
    }
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;







sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

// load models
var models = [
    'diagnostico',
    'clinica',
    'perro',
    'tratamiento'
];
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;