/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('perro', {
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
    sexo: {
      type: DataTypes.ENUM('macho','hembra'),
      allowNull: false
    },
    edad: {
      type: DataTypes.DATE,
      allowNull: false
    },
    raza: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    peso: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    clinica: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'clinica',
        key: 'id'
      }
    }
  }, {
    tableName: 'perro'
  });
};
