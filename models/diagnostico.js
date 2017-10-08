/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diagnostico', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    perro: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'perro',
        key: 'id'
      }
    },
    diagnostico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sintomatologia: {
      type: DataTypes.ENUM('respiratorio','digestivo','urinario','piel','oido','otros','trauma','oftalmo'),
      allowNull: false
    },
    cxt_atencion: {
      type: DataTypes.ENUM('qx','preqx','consulta','postqx'),
      allowNull: false
    },
    cultivo: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    abiograma: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    fiebre: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    otras_pruebas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fillTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fecha_visita: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'diagnostico'
  });
};
