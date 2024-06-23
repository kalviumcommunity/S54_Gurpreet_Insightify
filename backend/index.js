const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const { Router , userRouter } = require('./route/route.js')
const { surveyRouter } = require('./route/surveyRoutes.js')
const { responseRouter } = require('./route/responseRoutes.js')
const User = require('./models/user.js')

app.use(express.json())
app.use(bodyParser.json())
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

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.use('/route',Router)

app.use('/user', userRouter)

app.use('/survey', surveyRouter)

app.use('/response', responseRouter);

app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})