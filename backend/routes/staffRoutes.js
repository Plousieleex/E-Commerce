const express = require('express');
const authController = require('./../controllers/authController');
const staffController = require('./../controllers/staffController');

const router = express.Router();

// If user is not an admin, user can't signup staff members.
router.post('/signup', 
    authController.protect,
    authController.checkRole('admin'), 
    authController.signup);

// Staff members can Login
router.post('/login', authController.staffLogin);


module.exports = router;