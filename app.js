const express = require('express');//solicito express
const sequelize = require('./config/db');//solicito db
const app = express();
const path = require('path');
const routerObra = require('./routers/obraSocialRouter');
const routerPlan = require('./routers/planRouter');
const routerPaciente = require('./routers/pacienteRouter');
const routerEspecialidad = require('./routers/especialidadRouter');
const routerProfesion = require('./routers/profesionRouter');
const routerProfesional = require('./routers/profesionalRouter');

const profeProsional = require('./models/profesionalProfesion');
const profeEspecialidad = require('./models/profesionEspecialidad');

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//middlewares para manejo de datos
//procesa los datos enviados del cliente al servidor
app.use(express.json());//datos enviados como json
app.use(express.urlencoded({ extended: false }));// datos enviados como formulario


app.get('/',(req,res)=>{
    res.render('index');
})

//rutas
app.use('/obra',routerObra);
app.use('/plan',routerPlan);
app.use('/paciente',routerPaciente);
app.use('/especialidad',routerEspecialidad);
app.use('/profesion',routerProfesion);
app.use('/profesional',routerProfesional);

// Sincronizar base de datos
sequelize.sync({})
  .then(() => {
    console.log('Base de datos sincronizada');
    console.log(sequelize.models);
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos', err);
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando puerto:${PORT}`);
})