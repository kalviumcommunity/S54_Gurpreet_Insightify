const express = require("express");

const Router = express.Router();

const userRouter = express.Router()
const User = require('../models/user.js')


Router.use(express.json());

Router.get("/", (req, res) => {
  res.send("Route is working");
});

userRouter.get('/', async (req,res)=>{
  await User.find().then((data) => {
    returnData = data;
  });
  res.send(returnData);
})
userRouter.post('/',(req,res)=>{
  res.send("User post is working")
})
userRouter.delete('/',(req,res)=>{
  res.send("User delete is working")
})

module.exports = { Router , userRouter };
