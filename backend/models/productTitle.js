const mongoose = require('mongoose');

const productTitleSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        unique: [true, 'You have created a product title with this title.'],
        required: [true, 'A product title must have a title.']
    },
    productTitleDescription: {
        type: String
    }
});

const ProductTitle = mongoose.model('ProductTitle', productTitleSchema);

module.exports = ProductTitle;