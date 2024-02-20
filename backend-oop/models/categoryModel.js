const mongoose = require('mongoose');

class Category {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
        this.categorySchema = new mongoose.Schema({
            categoryTitle: {
                type: String,
                unique: [true, 'You have created a category with that title.'],
                required: [true, 'A category must have a title.']
            },
            categoryDescription: {
                type: String
            }
        });

        this.categoryModel = mongoose.model('Category', this.categorySchema);
    }

    createCategory() {
        return this.categoryModel.create(this.categorySchema);
    }
}

module.exports = Category;