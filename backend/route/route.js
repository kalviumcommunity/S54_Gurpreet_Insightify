const express = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user.js');
const Router = express.Router();
const userRouter = express.Router();

Router.use(express.json());

Router.get("/", (req, res) => {
  res.send("Route is working");
});

// Get user details by userId
userRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ _id : req.params.userId });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving user', error: error.message });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { userId, email, userName } = req.body;
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({
        email: email,
        userName: userName,
        userId: userId
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).send({ mongoUserId: user._id, token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

userRouter.delete('/', async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.body);
    if (user) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { Router, userRouter };