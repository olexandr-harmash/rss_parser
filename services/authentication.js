var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = async function(dto) {
  var user = new User();

  user.name = dto.name;
  user.email = dto.email;

  user.setPassword(dto.password);
  try {
    await user.save();
  } catch(err) {
    
  }

  return user.generateJwt();
};

module.exports.login = function(user) {
    return user.generateJwt();
};