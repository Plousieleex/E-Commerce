const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createCategory = catchAsync(async(req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: newCategory
        }
    });

    next();
});