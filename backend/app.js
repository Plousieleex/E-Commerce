const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const staffRouter = require('./routes/staffRoutes');

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());


// Routes
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/staff', staffRouter);



module.exports = app;