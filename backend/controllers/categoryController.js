const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = Category.find();

    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category: newCategory
        }
    });
});