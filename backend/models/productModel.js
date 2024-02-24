const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'A product must have a name.']
    },
    productDescription: {
        type: String,
        required: [true, 'A product must have a description.']
    },
    productMedia: {
        type: [String],
        required: [true, 'A product must have one or more images.']
    },
    productPrice: {
        type: Number,
        required: [true, 'A product must have a price.']
    },
    productCompareAtPrice: {
        type: Number,
        default: null
    },
    productInventory: [
        {
            inventoryQuantity: {
                type: Number,
                default: 0
            },
            trackByCustomers: {
                type: Boolean,
                default: false
            }
        }
    ],
    productVariants: [
        {
            variantName: String,
            variantDescription: String,
            variantPrice: {
                type: Number
            },
            variantInventory: {
                type: Number
            },
            variantInventoryTrack: {
                type: Boolean
            }
        }
    ],
    productStatus: {
        type: Boolean,
        required: [true, 'A product need a status. Active / Deactive.'],
        default: true
    },
    // Product can belong to one or more categories.
    productCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    vendor: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: {
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;