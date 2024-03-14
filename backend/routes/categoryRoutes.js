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
  .route('/subcategory/:id/products')
  .get(categoryController.getProductsSubCategory);

router
  .route('/parentcategory')
  .get(categoryController.getAllParentCategory)
  .post(categoryController.createParentCategory);

router
  .route('/parentcategory/:id')
  .get(categoryController.getParentCategory)
  .patch(categoryController.updateParentCategory)
  .delete(categoryController.deleteParentCategory);

router
  .route('/parentcategory/:id/products')
  .get(categoryController.getProductsParentCategory)

router
  .route('/productcategory')
  .get(categoryController.getAllProductCategory)
  .post(categoryController.createProductCategory)

router
  .route('/productcategory/:id')
  .get(categoryController.getProductCategory)
  .patch(categoryController.updateProductCategory)
  .delete(categoryController.deleteProductCategory)

module.exports = router;