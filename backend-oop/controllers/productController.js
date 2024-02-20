const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.createProduct(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });
});

exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.getProducts();

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});