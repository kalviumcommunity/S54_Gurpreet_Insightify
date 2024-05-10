const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        unique : true
    }
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel