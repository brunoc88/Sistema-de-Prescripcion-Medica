const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Plan = require('./plan');


const ObraSocial = sequelize.define('ObraSocial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
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


ObraSocial.hasMany(Plan,{
    foreignKey: 'idObra',
    sourceKey:'id'
})
Plan.belongsTo(ObraSocial, {
  foreignKey: 'idObra',
  targetKey: 'id'
})



module.exports = ObraSocial;
