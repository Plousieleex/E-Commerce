const mongoose = require('mongoose');

class Product{
    constructor(productModel) {
        this.productModel = productModel;
        this.productSchema = new mongoose.Schema({
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
                type: Number
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
                        type: Boolean,
                    }
                }
            ],
            productStatus: {
                type: Boolean,
                required: [true, 'A product need a status. Active / Deactive'],
                default: true
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
                default: Date.now()
            },
            createdBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        });

        this.productModel = mongoose.model('Product', this.productSchema);
    }

    static async createProduct(productData) {
        const newProduct = await new Product().productModel.create(productData);
        return newProduct;
    }

    async updateProduct(productId, newData) {
        return await this.productModel.findByIdAndUpdate(productId, newData, {new: true});
    }

    async deleteProduct(productId) {
        return await this.productModel.findByIdAndDelete(productId);
    }

    async getProductById(productId) {
        return await this.productModel.findById(productId);
    }

    static async getProducts() {
        const allProducts = await Product().productModel.find();
        return allProducts;
    }
}

module.exports = Product;