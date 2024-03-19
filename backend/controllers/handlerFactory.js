const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Create Model
exports.createOne = Model => 
  catchAsync(async(req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Get Model (One Model)
exports.getOne = (Model, popOptions) => 
  catchAsync(async(req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if(!doc){
      return next(new AppError('No Document found with that ID.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Get All Models
exports.getAll = Model => 
  catchAsync(async(req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

// Delete Model
exports.deleteOne = Model => 
  catchAsync(async(req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc){
      return next(new AppError('No Document found with that ID.', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

// Update Model
exports.updateOne = Model =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!doc){
            return next(new AppError('No Document found with that ID.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

// Update Category Image
exports.updateCategoryImage = Model =>
    catchAsync(async(req, res, next) => {
        const {categoryImage} = req.body;
        const doc = await Model.findByIdAndUpdate(req.params.id, { categoryImage }, {
            new: true,
            runValidators: true
        });

        if(!doc){
            return next(new AppError('No Document found with that ID.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

