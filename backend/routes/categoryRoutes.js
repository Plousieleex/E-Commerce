const express = require('express');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

router
    .route('/subcategory-with-product-category')
    .get(categoryController.getSubCategoriesWithProductCategories);

router
  .route('/subcategory')
  .get(categoryController.getAllSubCategory)
  .post(
      categoryController.uploadCategoryImage,
      categoryController.createSubCategory
  );

router
  .route('/subcategory/:id')
  .get(categoryController.getSubCategory)
  .patch(
      categoryController.uploadCategoryImage,
      categoryController.resizeCategoryImage,
      categoryController.updateSubCategory
  )
  .delete(categoryController.deleteSubCategory);

router
  .route('/subcategory/:id/products')
  .get(categoryController.getProductsSubCategory);

router
  .route('/parentcategory')
  .get(
      categoryController.uploadCategoryImage,
      categoryController.getAllParentCategory
  )
  .post(
      categoryController.uploadCategoryImage,
      categoryController.resizeCategoryImage,
      categoryController.createParentCategory
  );

router
  .route('/parentcategory/:id')
  .get(categoryController.getParentCategory)
  .patch(
      categoryController.uploadCategoryImage,
      categoryController.resizeCategoryImage,
      categoryController.updateParentCategory
  )
  .delete(categoryController.deleteParentCategory)
  .put(categoryController.updateParentVisibility);

/*router
  .route('/parentcategory/:id/products')
  .get(categoryController.getProductsParentCategory)*/

/*router
  .route('/:id')
  .patch(categoryController.updateCategoryVisibility);*/

router
  .route('/productcategory')
  .get(categoryController.getAllProductCategory)
  .post(
      categoryController.uploadCategoryImage,
      categoryController.createProductCategory
  );

router
  .route('/productcategory/:id')
  .get(categoryController.getProductCategory)
  .patch(
      categoryController.uploadCategoryImage,
      categoryController.resizeCategoryImage,
      categoryController.updateProductCategory
  )
  .delete(categoryController.deleteProductCategory);

/* router
    .route('/selectedcategories') */

module.exports = router;