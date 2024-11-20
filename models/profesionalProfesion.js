const Profesional = require('./profesional');
const Profesion = require('./profesion');
const sequelize = require('../config/db');

const ProfesionalProfesion = sequelize.define('ProfesionalProfesion', {}, { timestamps: false , freezeTableName: true});

Profesional.belongsToMany(Profesion, { through: ProfesionalProfesion });
Profesion.belongsToMany(Profesional, { through: ProfesionalProfesion });

module.exports = ProfesionalProfesion;