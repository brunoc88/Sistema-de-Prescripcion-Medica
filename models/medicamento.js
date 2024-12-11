const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//tragio las clases para hacer las relaciones
const Forma = require('../models/forma');
const Familia = require('../models/familia');
const Categoria = require('../models/categoria');

const Medicamento = sequelize.define(
    'Medicamento',{
        idMedicamento:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        concentracion:{
            type: DataTypes.STRING,
            allowNull:false
        },
        cantidad:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)
//muchos a 1
Forma.hasMany(Medicamento,{
    foreignKey: 'id_forma',
    sourceKey: 'idForma'
})
//1 a muchos
Medicamento.belongsTo(Forma,{
    foreignKey:'id_forma',
    targetKey:'idForma'
})

Familia.hasMany(Medicamento,{
    foreignKey: 'id_familia',
    sourceKey: 'idFamilia'
})

Medicamento.belongsTo(Familia,{
    foreignKey: 'id_familia',
    targetKey: 'idFamilia'
})

Categoria.hasMany(Medicamento,{
    foreignKey: 'id_categoria',
    sourceKey: 'idCategoria'
})

Medicamento.belongsTo(Categoria,{
    foreignKey: 'id_categoria',
    targetKey: 'idCategoria'
})


module.exports = Medicamento;