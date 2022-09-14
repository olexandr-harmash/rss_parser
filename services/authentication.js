const mongoose = require('mongoose');
const User = mongoose.model('User');
const error = require('../config/errors');

const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = async function (dto) {
  const user = new User();

  user.name = dto.name;
  user.email = dto.email;

  user.setPassword(dto.password);
  try {
    await user.save();
  } catch (err) {
    throw error.checkMongoError(err)
  }

  return user.generateJwt();
};

module.exports.login = function (user) {
  return user.generateJwt();
};
