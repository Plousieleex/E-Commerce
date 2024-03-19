const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'ParentCategory',
        required: true
    },
    subCategoryTitle: {
        type: String,
        unique: [true, 'You have created a sub-category with that title.'],
        required: [true, 'A category must have a title.']
    },
    categoryDescription: {
        type: String
    },
    categoryImage: {
        type: [String]
    },
    productCategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'ProductCategory'
        }
    ]
});

subCategorySchema.pre('save', async function(next){
    const parentCategoryToUpdate = await mongoose.model('ParentCategory').findByIdAndUpdate(
        this.parentCategory,
        {$addToSet: {subCategories: this._id}}
    );
    next();
});

subCategorySchema.pre(/^find/, function (next){
    this.populate({
        path: 'parentCategory',
        select: 'parentCategoryTitle'
    });
    next();
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;