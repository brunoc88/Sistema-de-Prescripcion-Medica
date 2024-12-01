const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profesion = require('./profesion');
//const Especialidad = require('./especialidad');

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
            defaultValue:true,
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

module.exports = Profesional;