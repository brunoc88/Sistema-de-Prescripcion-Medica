const express = require('express');//solicito express
const db = require('./config/db');//solicito db
const app = express();
const path = require('path');


// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.render('index');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando puerto:${PORT}`);
})