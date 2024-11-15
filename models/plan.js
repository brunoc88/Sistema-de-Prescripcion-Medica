const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Paciente = require('../models/paciente');

const Plan = sequelize.define(
    'Plan', {
    idPlan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
}
)
Plan.hasMany(Paciente, {
    foreignKey: 'id_plan',
    sourceKey: 'idPlan'
  })
  
  Paciente.belongsTo(Plan,{
    foreignKey:'id_plan',
    targetKey:'idPlan'
  })
module.exports = Plan;