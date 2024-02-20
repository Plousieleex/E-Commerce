const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const {all} = require("express/lib/application");

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

// Signup for all users
exports.signup = catchAsync(async (req, res, next) => {
     const {
         email,
         userNameSurname,
         phoneNumber,
         userRole,
         password,
         passwordConfirm
     } = req.body;

     const newUser= await User.createUser({
         email,
         userNameSurname,
         phoneNumber,
         userRole,
         password,
         passwordConfirm
     });

    createSendToken(newUser, 201, res);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await User.getAllUsers();

    res.status(200).json({
        status: 'success',
        result: allUsers.length,
        data: {
            users: allUsers
        }
    });
});