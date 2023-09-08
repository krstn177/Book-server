require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');

const connectionString = 'mongodb://127.0.0.1:27017/book-orders';
const PORT = process.env.PORT || 3030;
start();

async function start(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb connection established');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    
    app.get('/', (req, res) => {
        res.json({ message: "REST Service is fully operational"});
    });
    
    app.use('/auth', authController);
    app.use('/orders', orderController);
    
    app.listen(PORT, ()=> console.log('REST is ON'));
}
