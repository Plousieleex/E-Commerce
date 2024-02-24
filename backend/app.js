const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const productRouter = require('./routes/productRoutes');
//const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());


// Routes
//app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.use(globalErrorHandler);

module.exports = app;

