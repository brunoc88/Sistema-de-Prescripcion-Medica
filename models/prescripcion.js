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

Turno.hasOne(Prescripcion,{
    foreignKey: 'id_turno',
    sourceKey: 'idTurno'
})

Prescripcion.belongsTo(Turno,{
    foreignKey: 'id_turno',
    targetKey: 'idTurno'
})

Prescripcion.belongsToMany(Prestacion,{
    through: 'prescripcionPrestacion',
    foreignKey: 'id_prescripcion'
})

Prestacion.belongsToMany(Prescripcion,{
    through: 'prescripcionPrestacion',
    foreignKey: 'id_prestacion'
})



module.exports = Prescripcion;