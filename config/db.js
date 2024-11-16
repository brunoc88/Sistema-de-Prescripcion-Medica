const { Sequelize } = require('sequelize');

// Configuración de la conexión
const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Puede ser 'mysql', 'postgres', 'sqlite', 'mssql', según el tipo de base de datos
    logging: console.log, // Activar logs para debugging
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;
