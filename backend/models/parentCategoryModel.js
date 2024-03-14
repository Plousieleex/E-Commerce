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
        type: [String]
    },
    subCategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory'
        }
    ]
});

const ParentCategory = mongoose.model('ParentCategory', parentCategorySchema);

module.exports = ParentCategory;