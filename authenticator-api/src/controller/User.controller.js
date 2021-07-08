const EventEmitter = require('events');
const { httpResourceUpdated, httpResourceDeleted } = require('../lib/messages/httpMessages').success;
const { itemNotFound } = require('../lib/messages/httpMessages').clientError;
const { internalError } = require('../lib/messages/httpMessages').serverError;

const Auth = require('../model/Auth.model');
const User = require('../model/User.model');

class UserController extends EventEmitter {
  async handleGetUsers(req, res) {
    try {
      const { q } = req.query;

      const userItems = q
        ? await User.find({
          $or: [
            { userName: { $regex: q, $options: 'i' } },
            { userMail: { $regex: q, $options: 'i' } },
          ],
        })
        : await User.find();
      const userPayload = userItems.map(userItem => {
        return {
          userId: userItem.userId,
          userName: userItem.userName,
          userMail: userItem.userMail,
          userBio: userItem.userBio,
          userBirthday: userItem.userBirthday,
          userPreferences: userItem.userPreferences,
          lastLogin: userItem.lastLogin,
        }
      })
      res.status(200).send(userPayload);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  }

  async handleGetUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      const userItem = await User.findOne({ userId });
      if (!userItem) {
        return res.status(404).send(itemNotFound);
      }

      const userPayload = {
        userName: userItem.userName,
        userMail: userItem.userMail,
        userBio: userItem.userBio,
        userBirthday: userItem.userBirthday,
        userPreferences: userItem.userPreferences,
        lastLogin: userItem.lastLogin,
      }

      return res.status(200).send(userPayload);
    } catch (e) {
      console.log(e);
      return res.status(500).send(internalError);
    }
  }

  async handleUpdateUserByUserId(req, res,) {
    try {
      const { userId } = req.params;
      const { userBio, userBirthday } = req.body;

      // Check if entry with listId exists
      const found = await User.findOne({ userId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, update the authentication and user entry
      const userItem = await User.findOneAndUpdate({ userId }, { userBio, userBirthday }, { returnOriginal: false });

      const userPayload = {
        userName: userItem.userName,
        userMail: userItem.userMail,
        userBio: userItem.userBio,
        userBirthday: userItem.userBirthday,
        userPreferences: userItem.userPreferences,
        lastLogin: userItem.lastLogin,
      }
      res.status(200).send({ ...httpResourceUpdated, user: userPayload });
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  }

  async handleDeleteUserByUserId(req, res) {
    try {
      const { userId } = req.params;

      // Check if entry with userId exists
      const found = await User.findOne({ userId });
      if (!found) {
        return res.status(404).send(itemNotFound);
      }

      // If it does, delete the item
      await Auth.deleteOne({ userId });
      await User.deleteOne({ userId });
      res.status(200).send(httpResourceDeleted);
    } catch (e) {
      console.log(e);
      res.status(500).send(internalError);
    }
  }
}

module.exports = new UserController();
