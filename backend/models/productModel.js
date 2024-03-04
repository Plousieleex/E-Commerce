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
    productCategory: [
        {
            productParentCategory: {
                type: mongoose.Schema.ObjectId,
                ref: 'ParentCategory'
            },
            productSubCategory: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: 'SubCategory'
                }
            ]

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
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

/* productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
}); */

productSchema.pre(/^find/, function(next){
    this.populate({
        path: 'createdBy',
        select: 'userNameSurname email phoneNumber'
    })
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;