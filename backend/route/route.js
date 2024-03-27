const express = require("express");

const Router = express.Router();

const userRouter = express.Router()
const User = require('../models/user.js')


Router.use(express.json());

Router.get("/", (req, res) => {
  res.send("Route is working");
});

userRouter.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
userRouter.post('/',(req,res)=>{
  res.send("User post is working")
})
userRouter.delete('/',(req,res)=>{
  res.send("User delete is working")
})

module.exports = { Router , userRouter };
