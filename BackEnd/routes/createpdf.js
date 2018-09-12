const express = require("express");
const router = express.Router();
const fs = require('fs'); 
const ejs = require('ejs');
const pdf = require('html-pdf') ;
const compiled = ejs.compile(fs.readFileSync('./invoice_templete/Q3.ejs' , 'utf-8'));


router.get('/' , async (req,res) => {
    const html = compiled({ title: 'hhhhhhh for test ' });
    await pdf.create(html).toFile('./outpdf/Q3.pdf', function (err, ress) {
        if (err) return console.log(err);
        console.log(ress);
        res.sendFile(ress.filename);
    });
   
})


module.exports = router ;
