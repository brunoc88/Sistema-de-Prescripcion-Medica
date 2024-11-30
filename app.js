const express = require('express');//solicito express
const sequelize = require('./config/db');//solicito db
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');//middleware para mensajes


//importamos las rutas
const routerObra = require('./routers/obraSocialRouter');
const routerPlan = require('./routers/planRouter');
const routerPaciente = require('./routers/pacienteRouter');
const routerEspecialidades = require('./routers/especialidadRouter');
const routerProfesion = require('./routers/profesionRouter');



// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//middlewares para manejo de datos
// Usar method-override para procesar el campo _method
app.use(methodOverride('_method'));

//procesa los datos enviados del cliente al servidor
app.use(express.json());//datos enviados como json
app.use(express.urlencoded({ extended: false }));// datos enviados como formulario
// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));


// Configuración de sesión
app.use(session({
  secret: 'clave-secreta', // Cambia esta clave a algo único
  resave: false,           // Evita guardar la sesión si no hubo cambios
  saveUninitialized: true  // Guarda sesiones nuevas aunque no tengan datos
}));
//limpiar mensajes
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  res.locals.errorMessage = req.session.errorMessage;
  req.session.message = null;
  req.session.errorMessage = null;
  next();
});


app.get('/',(req,res)=>{
    res.render('home/index');
})

//rutas
app.use('/obra',routerObra);
app.use('/plan',routerPlan);
app.use('/paciente',routerPaciente);
app.use('/especialidades',routerEspecialidades);
app.use('/profesion',routerProfesion);
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