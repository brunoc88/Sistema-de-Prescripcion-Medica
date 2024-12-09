const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define(
    'Categoria',{
        idCategoria:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type: DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Categoria;