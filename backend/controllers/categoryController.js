const subCategory = require('../models/subCategoryModel');
const parentCategory = require('../models/parentCategoryModel');
const factory = require('./handlerFactory');
const productTitle = require('./../models/productTitle');

// Create Sub Category
exports.createSubCategory = factory.createOne(subCategory);
// Create Parent Category
exports.createParentCategory = factory.createOne(parentCategory);
// Create Product Title
exports.createProductTitle = factory.createOne(productTitle);

// Update Sub Category
exports.updateSubCategory = factory.updateOne(subCategory);
// Update Parent Category
exports.updateParentCategory = factory.updateOne(parentCategory);
// Create Product Title
exports.updateProductTitle = factory.updateOne(productTitle);

// Get Sub Category (One Doc)
exports.getSubCategory = factory.getOne(subCategory);
// Get Parent Category (One Doc)
exports.getParentCategory = factory.getOne(parentCategory);
// Get Product Title (One Doc)
exports.getProductTitle = factory.getOne(productTitle);

// Get Sub Category (All)
exports.getAllSubCategory = factory.getAll(subCategory);
// Get Parent Category (All)
exports.getAllParentCategory = factory.getAll(parentCategory);
// Get Product Title (All)
exports.getAllProductTitle = factory.getAll(productTitle);

// Delete Sub Category
exports.deleteSubCategory = factory.deleteOne(subCategory);
// Delete Parent Category
exports.deleteParentCategory = factory.deleteOne(parentCategory);
// Delete Product Title
exports.deleteProductTitle = factory.deleteOne(productTitle);

