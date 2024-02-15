const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router
    .route('/')
    // Get all products
    .get(productController.getAllProducts)
    // Not Finished Don't Use.
    .post(productController.createProduct);

router
    .route('/:id')
    // Get spesific data (Parameter = id)
    .get(productController.getProduct);

module.exports = router;