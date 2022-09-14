const passport = require('passport');
const UserService = require('../services/authentication');
const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = async function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  try {
    const token = await UserService.register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    sendJSONresponse(res, 200, {
      token: token,
    });
  } catch (err) {
    sendJSONresponse(res, 404, err);
  }
};

module.exports.login = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    let token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if (user) {
      token = UserService.login(user);
      sendJSONresponse(res, 200, {
        token: token,
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res, next);
};
