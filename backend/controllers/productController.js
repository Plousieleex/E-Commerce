const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Create Product 
exports.createProduct = catchAsync(async(req, res, next) => {
    const createdBy = req.user._id;
    req.body.createdBy = createdBy;
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: newProduct
        }
    });
}); 

// Get One Product with Details
exports.getProductDetailed = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            data: product
        }
    }); 
});

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

// Get all products
exports.getProducts = catchAsync(async(req, res, next) => {
    const allProducts = await Product.find();
    res.status(200).json({
        status: 'success',
        results: allProducts.length,
        data: {
            data: allProducts
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

// Updating products 
exports.updateProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!product){
        return next(new AppError('No product found with that ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: product
        }
    });
}); 

// Deleting Products
exports.deleteProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
        return next(new AppError('No product found with that ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});