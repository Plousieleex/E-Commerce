const subCategory = require('../models/subCategoryModel');
const parentCategory = require('../models/parentCategoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Create Sub Category
exports.createSubCategory = factory.createOne(subCategory);
// Create Parent Category
exports.createParentCategory = factory.createOne(parentCategory);

// Update Sub Category
exports.updateSubCategory = factory.updateOne(subCategory);
// Update Parent Category
exports.updateParentCategory = factory.updateOne(parentCategory);

// Get Sub Category (One Doc)
exports.getSubCategory = factory.getOne(subCategory);
// Get Parent Category (One Doc)
exports.getParentCategory = factory.getOne(parentCategory);

// Get Sub Category (All)
exports.getAllSubCategory = factory.getAll(subCategory);
// Get Parent Category (All)
exports.getAllParentCategory = factory.getAll(parentCategory);

// Delete Sub Category
exports.deleteSubCategory = factory.deleteOne(subCategory);
// Delete Parent Category
exports.deleteParentCategory = factory.deleteOne(parentCategory);
