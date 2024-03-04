const Address = require('./../models/addressModel');
const factory = require('./handlerFactory');

exports.getUser = (req, res, next) => {
  req.body.user = req.user._id;
  next();
};

exports.createAddress = factory.createOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.getAddress = factory.getOne(Address);
exports.getAllAdress = factory.getAll(Address);
exports.deleteAddress = factory.deleteOne(Address);