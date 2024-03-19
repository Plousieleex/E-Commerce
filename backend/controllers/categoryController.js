const subCategory = require('../models/subCategoryModel');
const parentCategory = require('../models/parentCategoryModel');
const productCategory = require('../models/productCategoryModel');
const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

// Create Sub Category
exports.createSubCategory = factory.createOne(subCategory);
// Create Parent Category
exports.createParentCategory = factory.createOne(parentCategory);
// Create Product Category
exports.createProductCategory = factory.createOne(productCategory);

// Update Sub Category
exports.updateSubCategory = factory.updateOne(subCategory);
// Update Parent Category
exports.updateParentCategory = factory.updateOne(parentCategory);
// Update Product Category
exports.updateProductCategory = factory.updateOne(productCategory);

// Get Sub Category (One Doc)
exports.getSubCategory = factory.getOne(subCategory);
// Get Parent Category (One Doc)
exports.getParentCategory = factory.getOne(parentCategory);
// Get Product Category (One Doc)
exports.getProductCategory = factory.getOne(productCategory);

// Get Sub Category (All)
exports.getAllSubCategory = factory.getAll(subCategory);
// Get Parent Category (All)
exports.getAllParentCategory = factory.getAll(parentCategory);
// Get Parent Category (All)
exports.getAllProductCategory = factory.getAll(productCategory);

// Delete Sub Category
exports.deleteSubCategory = factory.deleteOne(subCategory);
// Delete Parent Category
exports.deleteParentCategory = factory.deleteOne(parentCategory);
// Delete Product Category
exports.deleteProductCategory = factory.deleteOne(productCategory);

// ParentCategory GET

/*exports.getParentCategoryProducts = catchAsync(async(req, res, next) => {
    const subCategories = await subCategory.find({parentCategory: req.params.parentId});
    const productIds = await subCategories.map(subCategory => subCategory._id);
    const product = await productCategory.find({subCategory: productIds});
    const prodIds = await product.map(productCategory => productCategory._id);
    const products = await Product.find({productCategory: {$in: prodIds}});
    console.log(products);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            data: products
        }
    })
});*/

// GET All Products by ParentCategory

exports.getProductsParentCategory = catchAsync(async(req, res, next) => {
    const subCategories = await subCategory.find({parentCategory: req.params.id});

    const productCategories = await Promise.all(subCategories.map(subCategory => {
        return productCategory.find({ subCategory: subCategory._id });
    }));

    const products = await Promise.all(productCategories.flat().map(productCategory => {
        return Product.find({ productCategory: productCategory._id });
    }));

    res.status(200).json({
        status: 'success',
        result: products.length,
        data: {
            data: products.flat()
        }
    });
});

// GET All Products by SubCategory

exports.getProductsSubCategory = catchAsync(async(req, res, next) => {
    const productCategories = await productCategory.find({
        subCategory: req.params.id
    });

    const products = await Promise.all(productCategories.map(productCategory => {
        return Product.find({ productCategory: productCategory._id });
    }));

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            data: products
        }
    });
});

