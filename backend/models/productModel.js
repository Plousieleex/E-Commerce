const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'A product must have a name.']
    },
    productDescription: {
        type: String
        // Required
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
        type: Number
    },
    productInventory: [
        {
            type: {
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
                type: Number,
                default: function () {
                    return this.productPrice;
                }
            },
            variantInventory: {
                type: Number,
                default: function () {
                    return this.productInventory;
                }
            },
            variantInventoryTrack: {
                type: Boolean,
                default: function () {
                    return this.trackByCustomers;
                }
            }
        }
    ],
    productStatus: {
        // Active / Deactive
        type: Boolean,
        required: [true, 'A product need a status. Active / Deactive'],
        default: 'Active'
    },
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
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;