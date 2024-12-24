const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Paciente = require('./paciente');
const Profesional = require('./profesional');

const Turno = sequelize.define(
    'Turno',{
        idTurno:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

//relaciones
Profesional.hasMany(Turno,{
    foreignKey: 'id_profesional',
    sourceKey: 'idProfesional'
})

Turno.belongsTo(Profesional,{
    foreignKey: 'id_profesional',
    targetKey: 'idProfesional'
})

Paciente.hasMany(Turno,{
    foreignKey: 'id_paciente',
    sourceKey: 'idPaciente'
})

Turno.belongsTo(Paciente,{
    foreignKey: 'id_paciente',
    targetKey: 'idPaciente'
})

module.exports = Turno;