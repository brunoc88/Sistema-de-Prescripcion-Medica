const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Turno = require('../models/turno');
const Prestacion = require('../models/prestacion');


const Prescripcion = sequelize.define(
    'Prescripcion',{
        idPrescripcion:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        diagnostico:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        fechaVigencia:{
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

Turno.hasMany(Prescripcion,{
    foreignKey: 'id_turno',
    sourceKey: 'idTurno'
})

Prescripcion.belongsTo(Turno,{
    foreignKey: 'id_turno',
    targetKey: 'idTurno'
})

Prescripcion.hasMany(Prestacion,{
    foreignKey: 'id_prescripcion',
    sourceKey: 'idPrescripcion'
})

Prestacion.belongsTo(Prescripcion,{
    foreignKey: 'id_prescripcion',
    targetKey: 'idPrescripcion'
})

module.exports = Prescripcion;