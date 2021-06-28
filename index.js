console.log('Levantando server');

require('dotenv').config();


const mercadopago = require ('mercadopago');
mercadopago.configure({
  access_token: process.env.AccessToken,
  integrator_id: process.env.IntegratorId
});


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

let dataBaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xut0w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json({ extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {res.send('El servidor esta corriendo')});

app.get('/categories/:id', require('./controllers/categories/getCategories'))

app.get('/products/:categoryId', require('./controllers/products/getProducts'))

app.post('/buy', require('./controllers/products/buy'))

app.post('/notificaciones', require('./controllers/notificaciones'));



mongoose.connect(dataBaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
        if (error) {
            console.error('No fue posible conectarse a la base de datos', error)
        } else {
            // Comenzar a escuchar por conexiones
            app.listen(port, '0.0.0.0', () =>
                console.log(`;) Servidor corriendo en el puerto: ${port}`)
            )
        }
    });