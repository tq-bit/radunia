const EventEmitter = require('events');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');

const { userLogin, userRegister, httpOperationSuccess, userLoginExtend } = require('../lib/messages/httpMessages').success;
const {
  userExists,
  mailExists,
  missingAuthHeaders,
  authNotFound,
  notAuthorizedAction,
} = require('../lib/messages/httpMessages').clientError;
const { internalError } = require('../lib/messages/httpMessages').serverError;

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');
const { log } = require('console');

class AuthController extends EventEmitter {
  async handleSignupUser(req, res) {
    // Check if body is non - empty
    try {
      const { userName, password, userMail } = req.body;

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);

      const exists = await User.findOne({ $or: [{ userName }, { userMail }] });

      if (exists) {
        if (exists.userName === userName) {
          return res.status(400).send(userExists);
        }

        if (exists.userMail === userMail) {
          return res.status(400).send(mailExists)
        }
      }

      // Create the new DB entries and save them
      const userId = uuidv4();
      const auth = new Auth({
        userId,
        userName,
        // TODO: Add email adress here and make it searchable
        password: hash,
      });

      const user = new User({
        userId,
        userName,
        userMail,
        userBio: "404 - bio not found",
        userRoles: ['q-guest'],
        registered: DateTime.now(),
        lastLogin: DateTime.now(),
      });

      const newAuth = await auth.save();
      const newUser = await user.save();

      res.status(200).send({ ...userRegister, user: newUser });
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  }

  async handleAuthenticateUser(req, res) {
    try {
      const { userName, password } = req.body;

      // Try to find a user in database
      const exists = await Auth.findOne({ userName });
      if (!exists) {
        return res.status(404).send(authNotFound);
      }

      // Compare passwords
      const hash = bcrypt.compareSync(password, exists.password);
      if (!hash) {
        return res.status(404).send(authNotFound);
      }

      // Start the authorization process
      const authKey = uuidv4();
      const authValue = uuidv4();

      // Set the auth key within the process
      process.env[authKey] = authValue;

      // Create the JWT config and content
      const jwtPayload = { authKey, authValue };
      const jwtOptions = {
        audience: userName,
        issuer: req.hostname,
        expiresIn: '1m',
      };

      jwt.sign(
        jwtPayload,
        process.env.AUTH_SECRET,
        jwtOptions,
        (err, token) => {
          if (err) throw err;
          const headers = { 'x-auth-token': token };

          return res.status(200).set(headers).send(httpOperationSuccess);
        }
      );
    } catch (e) {
      throw e
    }
  }

  async handleLoginUser(req, res) {
    if (!req.headers['x-auth-token']) {
      return res.status(401).send(missingAuthHeaders);
    }
    try {
      const token = req.headers['x-auth-token'].split(' ')[1];
      jwt.verify(token, process.env.AUTH_SECRET, async (err, authPayload) => {
        if (err) {
          console.log(err)
          return res.status(403).send(notAuthorizedAction);
        } else {
          const { authKey, authValue } = authPayload;
          // Check if process variable has been set during authentication
          if (!process.env[authKey] === authValue) {
            delete process.env[authKey];
            return res.status(403).send(notAuthorizedAction);
            // If authentication is successful, perform login
          } else {
            delete process.env[authKey];
            const userName = authPayload.aud;
            const user = await User.findOneAndUpdate(
              { userName },
              { lastLogin: DateTime.now() }
            );
            // Build up payload and send back to client
            const userPayload = {
              userRoles: user.userRoles,
              userId: user.userId
            };
            const jwtOptions = {
              expiresIn: '2h',
            };
            jwt.sign(
              userPayload,
              process.env.API_SECRET,
              jwtOptions,
              (err, userToken) => {
                if (err) throw err;
                const headers = { 'x-api-token': userToken };
                return res
                  .status(200)
                  .set(headers)
                  .send({ ...userLogin, auth: userPayload });
              }
            );
          }
        }
      });
    } catch (e) {
      return res.status(500).send(internalError);
    }
  }

  async handleExtendUserSession(req, res) {
    const { iat, exp, ...userPayload } = req.session;
    const timeNow = DateTime.now();
    const timeLogin = DateTime.fromMillis(iat * 1000);
    const timeDiff = timeNow.diff(timeLogin);

    // If the token is older than a day, return an error
    if (timeDiff.toMillis() > 86400000) {
      return res.status(403).send(notAuthorizedAction);
    }

    const jwtOptions = {
      expiresIn: '2h',
    };

    jwt.sign(
      userPayload,
      process.env.API_SECRET,
      jwtOptions,
      (err, userToken) => {
        if (err) throw err;

        const headers = { 'x-api-token': userToken };
        return res
          .status(200)
          .set(headers)
          .send({ ...userLoginExtend, auth: userPayload });
      }
    );
  }

  async handleUpgradeUserByUserId(req, res) {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    log(user)
    if (!user.userRoles.some((role) => role === 'q-member')) {
      user.userRoles.push('q-member');
    } else if (
      user.userRoles.some((role) => role === 'q-member') &&
      !user.userRoles.some((role) => role === 'q-professional')
    ) {
      user.userRoles.push('q-professional');
    } else if (
      user.userRoles.some((role) => role === 'q-professional') &&
      !user.userRoles.some((role) => role === 'q-admin')
    ) {
      user.userRoles.push('q-admin');
    } else {
      return res.status(400).send(notAuthorizedAction);
    }

    const updatedUser = await User.findOneAndUpdate({ userId }, user);
    return res.status(200).send(httpOperationSuccess);
  }

  async handleDowngradeUserByUserId(req, res) {
    const { userId } = req.params;
    let user = await User.findOne({ userId });
    if (user.roles.some((role) => role === 'q-admin')) {
      console.log('Remove role q-admin');
      user.roles = user.roles.filter((role) => role !== 'q-admin');
    } else if (user.roles.some((role) => role === 'q-member')) {
      console.log('Remove role q-member');
      user.roles = user.roles.filter((role) => role !== 'q-member');
    } else if (user.roles.some((role) => role === 'q-guest')) {
      console.log('Remove role q-guest. This user is not able to access any resources anymore');
      user.roles = user.roles.filter((role) => role !== 'q-guest');
    } else {
      return res.status(403).send(notAuthorizedAction);
    }

    const updatedUser = await User.findOneAndUpdate({ userId }, user);
    res.status(200).send(httpOperationSuccess);
  }
}

module.exports = new AuthController();
