const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');
const Address = require('./addressModel');

const orderSchema = new mongoose.Schema({
  orders: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product name cant be blank.']
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity cant be blank.']
      },
      subtotalAmount: {
        type: Number
      }
    }
  ],
  orderStatus: {
    type: String,
    required: [true, 'Order status cant be blank.'],
    enum: ['Delivered', 'Pending', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    type: mongoose.Schema.ObjectId,
    ref: 'Address',
    required: [true, 'Shipping address cant be blank.']
  },
  customerNote: {
    type: String
  },
  totalAmount: {
    type: Number
  }
});

const Order = mongoose.Model('Order', orderSchema);

module.exports = Order;