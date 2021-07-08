const router = require('express').Router();
const UserController = require('../../../controller/User.controller');
const {
  verifyAdmin,
  verifyActiveUser,
  verifyGuest
} = require('../../../middleware/verifyUser');

router.get('/search', verifyGuest, (req, res) => {
  UserController.handleGetUsers(req, res);
});

router.get('/:userId', verifyAdmin, (req, res) => {
  UserController.handleGetUserByUserId(req, res);
});

router.get('/:userId/active', verifyGuest, verifyActiveUser, (req, res) => {
  UserController.handleGetUserByUserId(req, res);
});

router.put('/:userId', verifyAdmin, (req, res) => {
  UserController.handleUpdateUserByUserId(req, res);
});

router.put('/:userId/active', verifyGuest, verifyActiveUser, (req, res) => {
  UserController.handleUpdateUserByUserId(req, res,);
});

router.delete('/:userId', verifyAdmin, (req, res) => {
  UserController.handleDeleteUserByUserId(req, res);
});

module.exports = router;
