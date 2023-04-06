const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fielSchema = new Schema({
    filename : {
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    sender:{
        type:String
    },
    reciever:{
        type:String
    }

}, {timestamps:true})

module.exports = mongoose.model('File',fielSchema)