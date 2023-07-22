const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// setup template engine
const viewsPath = path.join(__dirname, './views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// setup static path
const staticPath = path.join(__dirname, './public');
app.use(express.static(staticPath));

// home route
app.get('/', (req, res)=>{
    res.render('index')
})

// creating transporder
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post('/sendmail', async(req, res)=>{
    try{
        const info = await transporter.sendMail({
            from: `"fabbythemes" <${process.env.SMTP_HOST_MAIL}>`,
            to: process.env.SMTP_HOST_MAIL,
            subject: req.body.subject,
            html: `<div>
                <h2>Email from: ${req.body.senderName}</h2>
                <p>${req.body.message}</p>
            </div>`
        })
        if(info.messageId){
            const mailback = await transporter.sendMail({
                from: `"Fabby Themes" <${process.env.SMTP_HOST_MAIL}>`,
                to: req.body.email,
                subject: "Fabby Themes Received Your Message!",
                html: `<div>
                    <h2>Hi ${req.body.senderName}!,</h2>
                    <p>We just received your message. Our team will get back to you soon.</p>
                    <p>Thanks</p>
                    <img src="cid:fabbythemes" alt="fabby themes logo" />
                </div>`,
                attachments: [
                    {
                        filename: 'fabby_themes_logo.png',
                        path: __dirname + '/public/images/fabby_themes_logo.png',
                        cid: 'fabbythemes'
                    }
                ]
            });
            res.status(201).json({
                msg: 'email sent successfully'
            })
        }else{
            res.status(500).json({
                msg: 'Email sending failed'
            })
        }
    }catch(err){
        console.log("email_error ",err)
        res.status(500).send("email not sent")
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log("server error", err)
    }
    console.log("the server is listening at: ", port)
})