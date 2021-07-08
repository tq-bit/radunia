const router = require('express').Router();
const AuthController = require('../../../controller/Auth.controller');
const { noEmptyPayload } = require('../../../middleware/verifyCommunication');
const { verifyGuest, verifyAdmin } = require('../../../middleware/verifyUser');

router.post('/authenticate', noEmptyPayload, (req, res) => {
  return AuthController.handleAuthenticateUser(req, res);
});

router.post('/login', (req, res) => {
  return AuthController.handleLoginUser(req, res);
});

router.post('/signup', noEmptyPayload, (req, res) => {
  return AuthController.handleSignupUser(req, res);
});

// handleExtendUserSession
router.post('/refresh', verifyGuest, (req, res) => {
  return AuthController.handleExtendUserSession(req, res);
});

router.put('/:userId/upgrade', (req, res) => {
  return AuthController.handleUpgradeUserByUserId(req, res);
});

router.put('/:userId/downgrade', verifyAdmin, (req, res) => {
  return AuthController.handleDowngradeUserByUserId(req, res);
});

module.exports = router;
