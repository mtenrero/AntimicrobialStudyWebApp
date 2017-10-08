const path = require('path');
const passport = require('passport');
var express = require('express');

var models = require('../models');
var Sequelize = require('sequelize');

var router = express.Router();

router.get('/pactivoStats', passport.authenticationMiddleware(), function(req, res, next){
    models.tratamiento.findAll({
        attributes: [
            'pactivo',
            [Sequelize.literal('COUNT(pactivo)'), 'pacount']
        ],
        group: 'pactivo'
    }).then(function (result) {
        res.render('stats', {title:'Estadísticas', stats: parseDataset(result), labels: labels(result)})
    });
});

var getPActivo = function(object) {
    return object.dataValues.pactivo;
}

var getQty = function(object) {
    return object.dataValues.pacount;
}

var parseDataset = function(json) {
    var data = {
        labels: [],
        datasets: [
            {
                data:[]
            }
        ]
    };

    data.labels = json.map(getPActivo);
    data.datasets[0].data = json.map(getQty);

    return data;
}

var labels = function(json) {
    console.log(JSON.stringify(json.map(getPActivo)))
    return JSON.stringify(json.map(getPActivo));
}

module.exports = router;