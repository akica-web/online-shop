const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');


const app = express();

mongoose.connect('mongodb+srv://ivek_r:iv183466@node-rest-shop-2gsv7.mongodb.net/node-angular?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database connected!')
})
.catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', '*' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use(productRoutes);

app.use(cartRoutes);

app.use(categoryRoutes);

app.use(orderRoutes);

app.use(userRoutes);





module.exports = app;
