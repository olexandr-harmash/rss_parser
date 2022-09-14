const mongoose = require('mongoose');
const httpError = require('http-errors');

const Messages = {
  notFount: 'Not found value',
  badRequest: 'Request is not trustworthy',
  internalServerError: 'Server is not responsible',
};
module.exports.Messages = Messages;

function notFound() {
  return new Error(Messages.notFount);
}
module.exports.notFound = notFound;

function badRequest() {
  return new Error(Messages.badRequest);
}
module.exports.badRequest = badRequest;

function internalServerError() {
  return new Error(Messages.internalServerError);
}
module.exports.internalServerError = internalServerError;

function compareErrors(err, compare) {
  //console.log(err.message, compare.message, Messages.badRequest)
  return err.message === compare;
}
module.exports.compareErrors = compareErrors;

module.exports.checkMongoError = function (err) {
  let apiErr;
  switch (err.constructor) {
    case mongoose.Error.ValidationError || mongoose.Error.OverwriteModelError:
      apiErr = badRequest();
      break;
    default:
      apiErr = internalServerError();
  }
  return apiErr;
};

module.exports.checkApiError = function (err) {
  let httpErr;
  switch (err.message) {
    case Messages.badRequest:
      httpErr = httpError.BadRequest();
      break;
    case Messages.notFount:
      httpErr = httpError.NotFound();
      break;
    default:
      httpErr = httpError.InternalServerError();
  }
  return httpErr;
};
