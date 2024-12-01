const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const REFEPS = sequelize.define(
    'REFEPS',{
        idRefeps:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        profesion:{
            type: DataTypes.STRING,
            allowNull:false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        num_registro:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },{
        freezeTableName: false,
        timestamps: false
    }    
)

module.exports = REFEPS;
