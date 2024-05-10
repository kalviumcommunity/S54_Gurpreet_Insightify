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
userRouter.post('/login',async (req,res)=>{
  try{
    const {userId,email,userName} = req.body
    let user = await User.findOne({userId})
    if (!user){
      user = new User({
        email : email,
        userName : userName,
        userId : userId
      })
      await user.save()
      res.status(201).send("User created sucessfully")
    }else{
      res.send("user already exist")
    }

    
    
  }catch(error){
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})
userRouter.delete('/', async(req,res)=>{
  try {
    const user = await User.findOneAndDelete(req.body);
    if (user) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch(error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = { Router , userRouter };
