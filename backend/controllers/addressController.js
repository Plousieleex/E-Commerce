const Address = require('./../models/addressModel');
const factory = require('./handlerFactory');

exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  req.body.user = userId;
  next();
};

exports.createAddress = factory.createOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.getAddress = factory.getOne(Address);
exports.getAllAdress = factory.getAll(Address);
exports.deleteAddress = factory.deleteOne(Address);