require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');


app.use(express.json())

// enable cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// run cors
app.use(allowCrossDomain);


// send mail via resquest
app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })



    const mailOptions = {
        from: req.body.email,
        to: 'musicupload@22records.in',
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send('error')
        }
        else {
            console.log("Email sent : " + info.response)
            res.send('success')
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})  

