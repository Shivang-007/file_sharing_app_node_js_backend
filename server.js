const express = require('express')
require('dotenv').config()
const path = require('path')
const app = express()
const connectDB = require('./config/db')
connectDB()

app.use(express.static('public'))
app.use(express.json())


//template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))


const port = process.env.port || 3000
app.listen(port, () => {
    console.log('server is listening on port: '+port)
})