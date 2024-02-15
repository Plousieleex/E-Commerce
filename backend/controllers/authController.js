const crypto = require('cryptojs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Staff = require('./../models/staffModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

    userPassword = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.staffLogin = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exists
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400));
    }

    // 1.5) Check if user exists in database
    const user = await Staff.findOne({email}).select('+password').select('+staffRole');
    if(!user){
        return next(new AppError('Incorrect email or password.'), 401);
    }
    // 2) Check user's userRole (If user is not staff or admin, they can't login)
    if(!user.userRole.includes('staff', 'admin')){
        return next(new AppError('You do not have permission to perform this action.', 401));
    }
    // 3) Check if password is correct
    if(!(await user.passwordConfirmation(password, user.password))){
        return next(new AppError('Incorrect email or password.', 401));
    }

    // 4) If everything is OK, send token
    createSendToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {
    const newStaff = await Staff.create({
        email: req.body.email,
        userNameSurname: req.body.userNameSurname,
        phoneNumber: req.body.phoneNumber,
        userRole: req.body.userRole,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newStaff, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await Staff.findById(decoded.id);
    if(!currentUser){
        return next(
            new AppError('The user belonging to this token does no longer exist.', 401)
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)){
        return next(
            new AppError('User recently changed password. Please log in again.', 401)
        )
    }

    // If everything is OK, ACCESS
    req.user = currentUser;
    next();
});

exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.userRole)){
            return next(
                new AppError('You do not have permission to perform this action.', 403));
        }
        next();
    };
};