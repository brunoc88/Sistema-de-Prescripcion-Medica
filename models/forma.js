const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Forma = sequelize.define(
    'Forma',{
        idForma:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
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

module.exports = Forma;