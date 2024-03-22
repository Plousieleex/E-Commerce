const mongoose = require('mongoose');

const parentCategorySchema = new mongoose.Schema({
    parentCategoryTitle: {
        type: String,
        unique: [true, 'You have created a parent category with this title.'],
        required: [true, 'A parent category must have a title.']
    },
    categoryDescription: {
        type: String
    },
    categoryImage:{
        type: String
    },
    subCategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory'
        }
    ],
    productVisibility: {
        type: Boolean
    }
});

parentCategorySchema.pre('save', async function(next){
    const trueCount = await this.constructor.countDocuments({productVisibility: true});

    if(trueCount >= 9){
        this.productVisibility = false;
    }

    next();
});

parentCategorySchema.pre(/^find/, async function(next){
    this.find({ productVisibility: true });
    next();
});

const ParentCategory = mongoose.model('ParentCategory', parentCategorySchema);

module.exports = ParentCategory;