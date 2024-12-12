const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoPrestacion = sequelize.define(
    'TipoPrestacion',{
        idTipo : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre:{
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

module.exports = TipoPrestacion;