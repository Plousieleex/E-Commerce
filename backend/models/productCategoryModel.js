const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    productCategoryTitle: {
        type: String,
        unique: [true, 'You have created a product category with this title.'],
        required: [true, 'A product category must have a title.']
    },
    productCategoryDescription: {
        type: String
    },
    productCategoryImage: {
        type: String
    }
});

productCategorySchema.pre('save', async function(next){
    const subCategoryToUpdate = await mongoose.model('SubCategory').findByIdAndUpdate(
        this.subCategory,
        {$addToSet: {productCategories: this._id}}
    );
    next();
});

productCategorySchema.pre('save', async function(next){
    const trueCount = await this.constructor.countDocuments({productVisibility: true});

    if (trueCount >= 8){
        this.productVisibility = false;
    }

    next();
});

productCategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'subCategory',
        select: 'subCategoryTitle'
    });
    next();
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;