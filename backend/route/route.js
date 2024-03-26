const express = require("express");

const Router = express.Router();

const userRouter = express.Router()



Router.use(express.json());

Router.get("/", (req, res) => {
  res.send("Route is working");
});

userRouter.get('/',(req,res)=>{
  res.send("User get is working")
})
userRouter.post('/',(req,res)=>{
  res.send("User post is working")
})
userRouter.delete('/',(req,res)=>{
  res.send("User delete is working")
})

module.exports = { Router , userRouter };
