const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Prestacion = sequelize.define(
    'Prestacion',{
        idPrestacion:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lado:{
            type: DataTypes.STRING,
            allowNull: true
        },
        indicacion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        justificacion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Prestacion;