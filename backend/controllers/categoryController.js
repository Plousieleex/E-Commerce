const multer = require('multer');
const sharp = require('sharp');
const SubCategory = require('../models/subCategoryModel');
const ParentCategory = require('../models/parentCategoryModel');
const ProductCategory = require('../models/productCategoryModel');
const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadCategoryImage = upload.single('imageCover');

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const imageCover = req.file;

    req.body.imageCover = `category-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(imageCover.buffer)
        .resize(271, 160)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/categories/${req.body.imageCover}`);

    req.body.categoryImage = req.body.imageCover;
    next();
});

/*let selectedParentCategories = [];
let selectedSubCategories = [];
let selectedProductCategories = [];

// Update selected parent categories for menu
exports.updateSelectedParentCategories = catchAsync(async(req, res, next) => {
    const { categories } = req.body;

    if (Array.isArray(categories) && categories.length === 0) {
        selectedParentCategories = categories;
    }

    const parentCategories = await ParentCategory.find({
       parentCategoryTitle: {$in: categories}
    });

    if (parentCategories.length > 0) {
        selectedParentCategories = parentCategories.map(category => category._id.toString());
    }

    res.status(200).json({
        status: 'success',
        data: selectedParentCategories
    })
});

// Update selected sub categories for menu
exports.updateSelectedSubCategories = catchAsync(async(req, res, next) => {

});

// Update selected product categories for menu
exports.updateSelectedProductCategories = catchAsync(async(req, res, next) => {

});*/

// PUT Update Parent Category visibility
exports.updateParentVisibility = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const { productVisibility } = req.body;

    const category = await ParentCategory.findOne({ _id: id });
    if (!category){
        return next(new AppError(
            'No document found with that ID.', 404
        ));
    }

    category.productVisibility = productVisibility;

    await category.save();

    res.status(200).json({
        status: 'success',
        data: {
            data: category
        }
    });
});

// PUT Update Sub Category visibility
exports.updateSubcategoryVisibility = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const { productVisibility } = req.body;

    const category = await SubCategory.findOne({ _id: id });
    if (!category){
        return next(new AppError(
            'No document found with that ID.', 404
        ));
    }

    category.productVisibility = productVisibility;

    await category.save();

    res.status(200).json({
        status: 'success',
        data: {
            data: category
        }
    })
});

// PUT Update Product Category visibility
exports.updateProductCategoryVisibility = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const { productVisibility } = req.body;

    const category = await ProductCategory.findOne({ _id: id });
    if (!category){
        return next(new AppError(
            'No document found with that ID.', 404
        ));
    }

    category.productVisibility = productVisibility;

    await category.save();

    res.status(200).json({
        status: 'success',
        data: {
            data: category
        }
    });
});

// Create Sub Category
exports.createSubCategory = factory.createOne(SubCategory);
// Create Parent Category (Without image)
exports.createParentCategory = factory.createOne(ParentCategory);
// Create Parent Category (With image)
/*exports.createParentCategoryWithImage = catchAsync(async(req, res, next) => {
    if(!req.file){
        return next(new AppError('Image upload is required.', 400));
    }

    upload.single('imageCover');

    const imageCover = req.file;

    req.body.imageCover = `category-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(imageCover.buffer)
        .resize(271, 160)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/categories/${req.body.imageCover}`);

    req.body.categoryImage = req.file.filename;
    createParentCategory(req, res, next);
});*/
// Create Product Category (Without image)
exports.createProductCategory = factory.createOne(ProductCategory);

// Update Sub Category
exports.updateSubCategory = factory.updateOne(SubCategory);
// Update Parent Category
exports.updateParentCategory = factory.updateOne(ParentCategory);
// Update Product Category
exports.updateProductCategory = factory.updateOne(ProductCategory);

// Get Sub Category (One Doc)
exports.getSubCategory = factory.getOne(SubCategory);
// Get Parent Category (One Doc)
exports.getParentCategory = factory.getOne(ParentCategory);
// Get Product Category (One Doc)
exports.getProductCategory = factory.getOne(ProductCategory);

// Get Sub Category (All)
exports.getAllSubCategory = factory.getAll(SubCategory);
// Get Parent Category (All)
exports.getAllParentCategory = factory.getAll(ParentCategory);
// Get Parent Category (All)
exports.getAllProductCategory = factory.getAll(ProductCategory);

// Delete Sub Category
exports.deleteSubCategory = factory.deleteOne(SubCategory);
// Delete Parent Category
exports.deleteParentCategory = factory.deleteOne(ParentCategory);
// Delete Product Category
exports.deleteProductCategory = factory.deleteOne(ProductCategory);

// ParentCategory GET

/*exports.getParentCategoryProducts = catchAsync(async(req, res, next) => {
    const subCategories = await SubCategory.find({ParentCategory: req.params.parentId});
    const productIds = await subCategories.map(SubCategory => SubCategory._id);
    const product = await ProductCategory.find({SubCategory: productIds});
    const prodIds = await product.map(ProductCategory => ProductCategory._id);
    const products = await Product.find({ProductCategory: {$in: prodIds}});
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
    const subCategories = await SubCategory.find({parentCategory: req.params.id});

    const productCategories = await Promise.all(subCategories.map(subCategory => {
        return ProductCategory.find({ subCategory: subCategory._id });
    }));

    const products = await Promise.all(productCategories.flat().map(productCategory => {
        return Product.find({ productCategory: productCategory._id });
    }));

    res.status(200).json({
        status: 'success',
        result: products.length,
        data: {
            data: products
        }
    });
});


// GET All Products by SubCategory
exports.getProductsSubCategory = catchAsync(async(req, res, next) => {
    const productCategories = await ProductCategory.find({
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

// GET All Categories
exports.getSubCategoriesWithProductCategories = catchAsync(async(req, res, next) => {
    const parentCategories = await ParentCategory.find();


    const subCategoriesWithProductCategories = await Promise.all(parentCategories.map(async (parentCategory) => {
        const subCategories = await SubCategory.find({ parentCategory: parentCategory._id });
        const subCategoriesData = await Promise.all(subCategories.map(async (subCategory) => {
            const productCategories = await ProductCategory.find({ subCategory: subCategory._id });
            return {
                subCategory: subCategory,
                productCategories: productCategories
            };
        }));
        return subCategoriesData;
    }));


    res.status(200).json({
        status: 'success',
        data: {
            data: subCategoriesWithProductCategories.flat()
        }
    });
});

