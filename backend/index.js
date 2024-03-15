const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const { Router } = require('./route/route.js')

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.use('/route',Router)

app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})