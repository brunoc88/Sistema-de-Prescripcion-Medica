const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Profesion = sequelize.define(
    'Profesion',{
        idProfesion:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
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

module.exports = Profesion;