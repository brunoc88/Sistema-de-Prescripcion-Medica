const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const Profesional = require('../models/profesional');
const Usuario = require('../models/usuario');

const Contrato = sequelize.define(
    'Contrato', {
        idContrato: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fechaCaducidad: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

// Relación 1 a 1: Profesional tiene un contrato
Profesional.hasOne(Contrato, {
    foreignKey: 'id_profesional',
    sourceKey: 'idProfesional',
});

Contrato.belongsTo(Profesional, {
    foreignKey: 'id_profesional',
    targetKey: 'idProfesional',
});

// Relación 1 a N: Usuario tiene varios contratos
Usuario.hasMany(Contrato, {
    foreignKey: 'id_usuario',
    sourceKey: 'id',
});

Contrato.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id',
});

module.exports = Contrato;
