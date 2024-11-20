const Profesion = require('./profesion');
const Especialidad = require('./especialidad');
const sequelize = require('../config/db');

const ProfesionEspecialidad = sequelize.define('ProfesionEspecialidad', {}, { timestamps: false,freezeTableName: true });

Profesion.belongsToMany(Especialidad, { through: ProfesionEspecialidad });
Especialidad.belongsToMany(Profesion, { through: ProfesionEspecialidad });

module.exports = ProfesionEspecialidad;
