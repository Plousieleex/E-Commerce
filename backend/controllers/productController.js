const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Get User id for Product Creation
exports.getUser = (req, res, next) => {
    req.body.createdBy = req.user._id;
    next();
};

// Create Product (Factory)
exports.createProduct = factory.createOne(Product);
// Update Product
exports.updateProduct = factory.updateOne(Product);
// Get One Product with Details
exports.getProductDetailed = factory.getOne(Product, {path: 'reviews'});
// Get All Products
exports.getProducts = factory.getAll(Product);
// Delete Product
exports.deleteProduct = factory.deleteOne(Product);

// Get One Product Showcase (Only Spesific Details)
exports.getProductShowcase = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id, {
        productName: 1,
        productMedia: 1,
        productPrice: 1,
        productCategory: 1
    });

    res.status(200).json({
        status: 'success',
        data: {
            data: product
        }
    });
});

// Get all products with Showcase
exports.getAllProductsShowcase = catchAsync(async(req, res, next) => {
    const allProductsShowcase = await Product.find().select(
        'productName productMedia productPrice productCompareAtPrice createdBy'
    );

    res.status(200).json({
        status: 'success',
        results: allProductsShowcase.length,
        data: {
            data: allProductsShowcase
        }
    });
});