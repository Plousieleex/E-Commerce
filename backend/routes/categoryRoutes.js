const express = require('express');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

router
  .route('/subcategory')
  .get(categoryController.getAllSubCategory)
  .post(categoryController.createSubCategory);

router
  .route('/subcategory/:id')
  .get(categoryController.getSubCategory)
  .patch(categoryController.updateSubCategory)
  .delete(categoryController.deleteSubCategory);

router
  .route('/parentcategory')
  .get(categoryController.getAllParentCategory)
  .post(categoryController.createParentCategory);

router
  .route('/parentcategory/:id')
  .get(categoryController.getParentCategory)
  .patch(categoryController.updateParentCategory)
  .delete(categoryController.deleteParentCategory);

module.exports = router;