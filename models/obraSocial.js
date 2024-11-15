const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Paciente = require('./paciente');

const ObraSocial = sequelize.define('ObraSocial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  freezeTableName: true,
  timestamps: false
});

ObraSocial.hasMany(Paciente,{
    foreignKey: 'idObra',// Nombre de la columna en Paciente que será la clave foránea
    sourceKey:'id'// La clave primaria de ObraSocial, que se usará para la relación
})
Paciente.belongsTo(ObraSocial,{
    foreignKey: 'idObra',// Columna en Paciente que tiene la clave foránea
    targetKey:'id'// La columna de ObraSocial que se utilizará para la relación
})

module.exports = ObraSocial;
