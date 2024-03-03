const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getCustomers = catchAsync(async(req, res, next) => {
  // GET ALL CUSTOMERS
  const customers = await User.find({ userRole: 'user' });

  res.status(200).json({
    status: 'success',
    data: {
      data: customers
    }
  });
});

exports.getStaffMembers = catchAsync(async(req, res, next) => {
  // GET ALL STAFF MEMBERS
  const staffMembers = await User.find({ $or: [{userRole: 'admin'}, {userRole: 'staff'}]});

  res.status(200).json({
    status: 'success',
    data: {
      data: staffMembers
    }
  });
});

exports.getCustomer = catchAsync(async(req, res, next) => {
  // GET ONE SPESIFIC CUSTOMER
  const customer = await User.findById(req.params.id);

  if(!customer){
    return next(new AppError('Error. Check the customer ID.', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: customer
    }
  });
});

exports.getStaffMember = catchAsync(async(req, res, next) => {
  // GET ONE SPESIFIC STAFF MEMBER
  const staffMember = await User.findById(req.params.id);

  if(staffMember.userRole === 'user'){
    return next(new AppError('Error. Wrong credentials.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: staffMember
    }
  });
});

exports.updateUserRole = catchAsync(async(req, res, next) => {
  // ONLY ADMIN'S CAN USE THIS
  // USE FOR UPDATING USER'S ROLE TO STAFF OR ADMIN 
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {userRole: req.body.userRole}, {
    new: true,
    runValidators: true
  });

  if(!updatedUser){
    return next(new AppError('User not found.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser
    }
  });
});

exports.updateMe = catchAsync(async(req, res, next) => {
  // UPDATE FUNCTION FOR SELF UPDATE
  // USERS CAN'T UPDATE THEIR ROLES 

  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password updates. Please use /updateMyPassword.', 400)
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'userRole', 'active');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser
    }
  });
});