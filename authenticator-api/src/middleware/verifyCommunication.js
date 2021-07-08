const { missingRequestBody } = require('../lib/messages/httpMessages').clientError;

const noEmptyPayload = (req, res, next) => {
  if (
    Object.keys(req.body).length === 0 &&
    req.body.constructor === Object &&
    Object.keys(req.body).every((key) => req.body[key])
  ) {
    return res.status(400).send(missingRequestBody);
  } else {
    next();
  }
};

const destructDataProp = (req, res, next) => {
  if (req.body.data) {
    req.body = { ...req.body.data }
  }
  next()
}

module.exports = { noEmptyPayload, destructDataProp };
