const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const addressRouter = require('./../routes/addressRoutes');

const router = express.Router();

router.use('/:userId/address', addressRouter);

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

router
    .route('/:id')
    .get(userController.getCustomer);

module.exports = router;