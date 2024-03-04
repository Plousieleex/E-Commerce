const express = require('express');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

router
  .route('/subcategory')
  .post(categoryController.createSubCategory);

router
  .route('/parentcategory')
  .post(categoryController.createParentCategory)



module.exports = router;