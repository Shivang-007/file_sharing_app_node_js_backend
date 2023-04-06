const express = require('express')
require('dotenv').config()
const path = require('path')
const File = require('../model/file')
const router = express.Router()

router.get('/:uuid', async (req, res) => {
    try{
        const file = await File.findOne({
            uuid:req.params.uuid
        })
        if(!file){
            return res.render('download',{error:'Link has been expired'})
        }
        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.filesize,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })
    }catch(err){
        return res.render('download',{error:'something went wrong'})
    }

})



module.exports = router