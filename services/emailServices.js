const nodemailer =require('nodemailer')
require('dotenv').config()

async function sendMail({ from,to,subject,text,html }){
    let mailTransporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    const info = await mailTransporter.sendMail({
        from:from,
        to:to,
        subject,
        text,
        html
    })
}

module.exports = sendMail