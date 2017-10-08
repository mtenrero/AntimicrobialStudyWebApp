/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tratamiento', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    diagnostico: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'diagnostico',
        key: 'id'
      }
    },
    naturaleza: {
      type: DataTypes.ENUM('nuevo','cambio'),
      allowNull: false
    },
    pactivo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ncomercial: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    concentracion: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    procedencia: {
      type: DataTypes.ENUM('humana','veterinaria'),
      allowNull: false
    },
    posologia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('sistemico','topico'),
      allowNull: false
    },
    via: {
      type: DataTypes.ENUM('oral','sc','iv','im','nasal','cutanea','intraconjuntival','vaginal','otica','sublingual','rectal','ocular','percutanea','intrarraquidea','intrarticular','intramamaria','intracardiaca','otros'),
      allowNull: false
    },
    presentacion: {
      type: DataTypes.ENUM('comprimido','capsula','solucion','emulsion','suspension','emulsion_oleoacuosa','c_efervescente','tableta','pildora','gragea','p_cubierta_enterica'),
      allowNull: false
    },
    unidades: {
      type: DataTypes.ENUM('comprimidos','gotas','ml','aplicaciones'),
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    revisar: {
      type: DataTypes.ENUM('revisar','correcto','sobredosis','infradosis','incorrectoOtro'),
      allowNull: false,
      defaultValue: "revisar"
    },
    correcto: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    },
    cantidad_mgkg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    repeticiones: {
      type: DataTypes.ENUM('4h','6h','8h','12h','16h','24h','36h','48h'),
      allowNull: false
    },
    duracion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dispensacion: {
      type: DataTypes.ENUM('clinica','farmaciaOficial','farmaciaOtra'),
      allowNull: true,
      defaultValue: "farmaciaOtra"
    },
    administracion: {
      type: DataTypes.ENUM('clinica','casa'),
      allowNull: true
    },
    tipo_receta_emitida: {
      type: DataTypes.ENUM('n_comercial','p_activo'),
      allowNull: false,
      defaultValue: "n_comercial"
    }
  }, {
    tableName: 'tratamiento'
  });
};
