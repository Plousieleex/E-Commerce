const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
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
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;