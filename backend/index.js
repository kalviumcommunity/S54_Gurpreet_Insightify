require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('server is running')
})
app.get('/ping',(req,res)=>{
    res.send('pong')
})

app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})