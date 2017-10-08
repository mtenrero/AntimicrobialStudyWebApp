/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clinica', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dirección: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER(9),
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    fecha_visita: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('llamadaTutor','llamadaCita','recogida','insertar','revisar','completo'),
        allowNull: false,
        defaultValue: 'llamadaTutor'
    }
  }, {
    tableName: 'clinica'
  });
};
