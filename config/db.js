require('dotenv').config()
const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true }, { useCreateIndex: true }) 
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('connected..')
    })
}
module.exports = connectDB