const express = require('express');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

router
    .route('/')
    // Get all categories
    .get(categoryController.getAllCategories)
    // Create new category
    .post(categoryController.createCategory);