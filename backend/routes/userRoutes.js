const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router
    .route('/signup')
    .post(authController.signup);

router
    .route('/login')
    .post(authController.login);

router
    .route('/adminlogin')
    .post(
        authController.adminLogin);

// Related to Customers and other stuff
router
    .route('/')
    .get(userController.getCustomers);

// Only for staff operations
router
    .route('/staff')
    .get(userController.getStaffMembers);

router
    .route('/:id')
    .get(userController.getCustomer)
    .patch(userController.updateUserRole);

router
    .route('/staff/:id')
    .get(userController.getStaffMember);

module.exports = router;