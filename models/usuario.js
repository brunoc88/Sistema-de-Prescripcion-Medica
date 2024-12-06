const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define(
    'Usuario',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false   
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true, // El avatar es opcional
    }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Usuario;