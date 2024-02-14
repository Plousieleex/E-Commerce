const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = Product.find();

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = Product.findById(req.params);

    if(!product){
        return next(new AppError('No product found with that ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            products: newProduct
        }
    });
});
