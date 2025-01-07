const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Medicamento = require('../models/medicamento');
const Prescripcion = require('../models/prescripcion');

const MedicamentoPrescripcion = sequelize.define(
    'MedicamentoPrescripcion',
    {
        idMedicamentoPres: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreComercial: {
            type: DataTypes.STRING,
            allowNull: true, // Opcional, si no se usa se toma el nombre genérico del medicamento
        },
        dosis: {
            type: DataTypes.STRING,
            allowNull: false, // Ejemplo: "500 mg"
        },
        administracion: {
            type: DataTypes.STRING,
            allowNull: false, // Ejemplo: "Cada 8 horas"
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

// Relación con Medicamento
Medicamento.hasMany(MedicamentoPrescripcion, {
    foreignKey: 'id_medicamento',
    sourceKey: 'idMedicamento',
});

MedicamentoPrescripcion.belongsTo(Medicamento, {
    foreignKey: 'id_medicamento',
    targetKey: 'idMedicamento',
});

// Relación con Prescripcion
Prescripcion.hasMany(MedicamentoPrescripcion, {
    foreignKey: 'id_prescripcion',
    sourceKey: 'idPrescripcion',
});

MedicamentoPrescripcion.belongsTo(Prescripcion, {
    foreignKey: 'id_prescripcion',
    targetKey: 'idPrescripcion',
});

module.exports = MedicamentoPrescripcion;
