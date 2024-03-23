const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const { Router } = require('./route/route.js')
const User = require('./models/user.js')

app.use(express.json())
app.use(cors())

async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb");
    }catch(err){
        console.log(err);
    }
  }
  main();

const users = [
    new User({
        email : "jason@gmail.com",
        userName : "jason",
        password : "jason1"
    }),
    new User({
        email: "alice@example.com",
        userName: "alice",
        password: "alice123"
    }),
    new User({
        email: "bob@yahoo.com",
        userName: "bob",
        password: "bobpassword"
    }),
    new User({
        email: "emma@hotmail.com",
        userName: "emma",
        password: "emmapass"
    }),
    new User({
        email: "john@example.com",
        userName: "john",
        password: "johnny"
    }),
    new User({
        email: "lisa@gmail.com",
        userName: "lisa",
        password: "lisapassword"
    }),
    new User({
        email: "mike@yahoo.com",
        userName: "mike",
        password: "mikepass123"
    }),
    new User({
        email: "sarah@example.com",
        userName: "sarah",
        password: "sarah456"
    }),
    new User({
        email: "david@hotmail.com",
        userName: "david",
        password: "davidpass"
    }),
    new User({
        email: "emily@gmail.com",
        userName: "emily",
        password: "emily789"
    })
]
User.insertMany(users)


app.get('/',(req,res)=>{
    res.send('server is running')
})

app.use('/route',Router)

app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})