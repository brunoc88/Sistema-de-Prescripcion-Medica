const express = require('express');//solicito express
const db = require('./config/db');//solicito db
const app = express();
const path = require('path');
const routerObra = require('./routers/obraSocialRoutes');



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

// Sincronizar base de datos
db.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos', err);
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando puerto:${PORT}`);
})