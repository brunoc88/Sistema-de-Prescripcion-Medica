const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const tipoPrestacion = require('../models/tipoPrestaciones');

const Prestacion = sequelize.define(
    'Prestacion',{
        idPrestacion:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)

tipoPrestacion.hasMany(Prestacion, {
    foreignKey: 'id_tipo_prestacion',
    sourceKey: 'idTipo'
});
Prestacion.belongsTo(tipoPrestacion, {
    foreignKey: 'id_tipo_prestacion',
    targetKey: 'idTipo'
});

module.exports = Prestacion;