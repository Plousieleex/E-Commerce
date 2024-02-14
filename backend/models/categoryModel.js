const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        unique: [true, 'You have created a category with that title.'],
        required: [true, 'A category must have a title.']
    },
    categoryDescription: {
        type: String
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;