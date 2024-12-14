const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profesion = require('./profesion');
const Especialidad = require('./especialidad');
const obraSocial = require('./obraSocial');


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
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        matricula:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        num_refeps:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        estado:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,//porque solo se va activar cuando se hago contrato
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

Profesion.hasMany(Profesional,{
    foreignKey: 'id_profesion',
    sourceKey: 'idProfesion'
})

Profesional.belongsTo(Profesion,{
    foreignKey: 'id_profesion',
    targetKey: 'idProfesion'
})

Especialidad.hasMany(Profesional,{
    foreignKey: 'id_especialidad',
    sourceKey: 'idEspecialidad'
})

Profesional.belongsTo(Especialidad,{
    foreignKey: 'id_especialidad',
    targetKey: 'idEspecialidad'
})

Profesional.belongsToMany(obraSocial, {
    through: 'obras_profesional', // Nombre de la tabla intermedia.
    foreignKey: 'id_profesional',
    otherKey: 'id_obra_social',
});

obraSocial.belongsToMany(Profesional, {
    through: 'obras_profesional', // Nombre de la tabla intermedia.
    foreignKey: 'id_obra_social',
    otherKey: 'id_profesional',
});

module.exports = Profesional;