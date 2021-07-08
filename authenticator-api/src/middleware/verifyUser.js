const jwt = require('jsonwebtoken');
const {
  missingAuthHeaders,
  notAuthorizedResource,
} = require('../lib/messages/httpMessages').clientError;

const verifyActiveUser = (req, res, next) => {
  const { userId: userIdUrl } = req.params;
  const { userId: userIdSession } = req.session;

  if (userIdSession.toString() !== userIdUrl.toString()) {
    console.log(
      `User ${userIdSession} tried to access data for user ${userIdUrl} on route ${req.originalUrl}`
    );
    return res.status(401).send(notAuthorizedResource);
  } else {
    next();
  }
};

const _authorizeRole = (req, res, next, rolename) => {
  if (!req.headers.authorization) {
    return res.status(401).send(missingAuthHeaders);
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.API_SECRET, {}, (err, session) => {
    if (err || !session.userRoles.includes(rolename)) {
      return res.status(401).send(notAuthorizedResource);
    }
    req.session = session;
    next();
  });
};

const verifyGuest = (req, res, next) => {
  _authorizeRole(req, res, next, 'q-guest');
};

const verifyMember = (req, res, next) => {
  _authorizeRole(req, res, next, 'q-member');
};

const verifyAdmin = (req, res, next) => {
  _authorizeRole(req, res, next, 'q-admin');
};

module.exports = { verifyActiveUser, verifyGuest, verifyMember, verifyAdmin };
