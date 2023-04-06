const express = require('express')
const multer = require('multer')
const path = require('path')
const File = require('../model/file')
const { v4: uuid4 } = require('uuid')


const router = express.Router()

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage,
    limits: {
        fileSize: 1000000 * 100
    }
}).single('myFile')

router.post('/', (req, res) => {

    //store file
    upload(req, res, async (err) => {

        //validate request
        if (!req.file) {
            return res.status(400).json({ error: 'please upload a file' })
        }


        if (err) {
            return res.status(500).send({ error: err.message })
        }
        //store into databse
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })

        const response = await file.save()
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` })
    })
})


router.post('/send_mail', async (req, res) => {
    const { uuid, emailFrom, emailTo } = req.body
    if(!uuid || !emailFrom || !emailTo){
        return res.status(422).send({error:'All fields are required'})
    }

    //get data from database
    const file = await File.findOne({ uuid:uuid })
    // if(file.sender){
    //     return res.status(422).send({error:'Email already send'})
    // }
    file.sender = emailFrom
    file.reciever = emailTo
    const response = await file.save()

    const sendMail = require('../services/emailServices')
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject:'Inshare File Sharing',
        text:`${emailFrom} shared a file with you`,
        html:require('../services/emailTemplate')({
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            size:parseInt(file.size/1000) + 'KB',
            expires:'24 hours'
        })
    })
    return res.status(200).json({message:"Email is sucessfully sent"})

})

module.exports = router