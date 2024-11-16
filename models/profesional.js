const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profesion = require('./profesion');
const Especialidad = require('./especialidad');

const Profesional = sequelize.define(
    'Profesional',{
        idProfesional:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        domicilio:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dni:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        matricula:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        estado:{
            type:DataTypes.BOOLEAN,
            defaultValue:true,
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)


Profesional.belongsTo(Profesion, {
    foreignKey: 'idProfesion', // Clave foránea en Profesional
    targetKey: 'idProfesion'   // Clave primaria en Profesion
});


Profesion.hasMany(Profesional, {
    foreignKey: 'idProfesion', // Clave foránea en Profesional
    sourceKey: 'idProfesion'   // Clave primaria en Profesion
});

Profesional.belongsTo(Especialidad,{
    foreignKey: 'especialidadId',
    targetKey: 'idEspecialidad'
})

Especialidad.hasOne(Profesional,{
    foreignKey: 'especialidadId',
    sourceKey: 'idEspecialidad'
})


module.exports = Profesional;