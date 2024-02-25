const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {promisify} = require('util');

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
};

// Signup for all users
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        email: req.body.email,
        userNameSurname: req.body.userNameSurname,
        phoneNumber: req.body.phoneNumber,
        userRole: req.body.userRole,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, res);
});

// Only admins and staffs can login via this

exports.adminLogin = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('No user found with that email.', 400));
    }

    const user = await User.findOne({email}).select('+password').select('+userRole');

    if(!user){
        return next(new AppError('Wrong credits.', 404));
    }

    // 1) Check User Role
    if(!(user.userRole === 'admin' || user.userRole === 'staff')){
        return next(new AppError('You do not have permission.', 400));
    }

    if(!(await user.passwordConfirmation(password, user.password))){
        return next(new AppError('Wrong credits.', 404));
    }

    // 3) Send token
    createSendToken(user, 200, res);
});

// Normal user login
exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exists
    if(!email || !password){
        return next(new AppError('No user found with that email.', 400))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.passwordConfirmation(password, user.password))){
        return next(new AppError('Wrong credits.', 404));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.permit = (...permittedRoles) => {
    return (req, res, next) => {
        if(!permittedRoles.includes(req.user.userRole)){
            return next(
                new AppError('You do not have permission to perform this action.', 403)
            );
        }
        next();
    };
};

exports.protect = catchAsync(async(req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        )
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(
            new AppError('The user belonging to this token does no longer exist.', 401)
        )
    }

    // 4) Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
});

exports.forgotPassword = catchAsync(async(req, res, next) => {
    // 1) First, check if email is valid
    const user = User.findOne({email: req.body.email});
    if(!user){
        return next(new AppError('There is no user with this email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    // 3) Send it to user's email.

    // This part will be done later.
});