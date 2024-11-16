const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Especialidad = sequelize.define(
    'Especialidad',{
        idEspecialidad:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Especialidad;