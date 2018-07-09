import * as express from 'express';
import { Router } from 'express';
import * as NodeMailer from 'nodemailer';

const router = Router();

interface IMailObject {
    sender : string; 
    receiver : string; 
    subject : string;
    content : string 
}

router.post('/', function(req, res) {

    if (validateEmail(req))
    {
       let mailObject : IMailObject = { 
           sender : req.body.sender, 
           receiver : req.body.receiver, 
           subject : req.body.subject, 
           content : req.body.content
       }
       send(mailObject);
    }

    res.status(201).json({
        message: 'Selamat World!'
    })
});

function validateEmail(req) : boolean {

    console.log(req.body)

    if (req && req.body && req.body.sender && req.body.receivers)
        return true;
        
    return false;
}

function send(mailObject : IMailObject) {

    
    let transporter = NodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
           // user: account.user, // generated ethereal user
           // pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: mailObject.sender, // '"Fred Foo 👻" <foo@example.com>', // sender address
        to: mailObject.receiver, // 'bar@example.com, baz@example.com', // list of receivers
        subject: mailObject.subject, // 'Hello ✔', // Subject line
        text: mailObject.content // 'Hello world?', // plain text body
        //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', NodeMailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

router.post('/:id', function(req, res) {
    res.json({
        message: 'Hello World!'
      })
});

export default router;

