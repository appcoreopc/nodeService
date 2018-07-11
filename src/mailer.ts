import * as express from 'express';
import { Router } from 'express';
import * as NodeMailer from 'nodemailer';


const router = Router();

interface IMailObject {
    sender: string;
    receiver: string;
    subject: string;
    content: string
}

router.post('/', function (req, res) {

    let result: boolean = false;

    console.log('initiating email send');

    if (validateEmail(req)) {

        let mailObject: IMailObject = {            
            sender: req.body.sender,
            receiver: req.body.receiver,
            subject: req.body.subject,
            content: req.body.content
        }

        let result = send(mailObject);

        console.log('after calling send method');
        
        if (result) {
            res.status(201).json({
                message: 'sent successful!'
            })
        }
        else 
        {
            res.status(500).json({
                message: 'unable to send email        '
            })
        }
    }
    else { 
        console.log('unable to validate send info.');
    }
});

function validateEmail(req): boolean {
    console.log(req.body)

    if (req && req.body && req.body.sender && req.body.receiver)
        return true;
    return false;
}

async function send(mailObject: IMailObject): Promise<any> {     
    let result = await sendMail(mailObject);
    console.log('state of send operation', result);
    console.log('done! servising request');
}

function sendMail(mailObject: IMailObject) { 

    console.log('send email to smpt transport');
    return new Promise<any>((resolve, reject) => {

        let transporter = NodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                 user: 'nlalbndxnvcepenz@ethereal.email', // generated ethereal user
                 pass: 'MAJAcN5T5dz8SaQC6E' // generated ethereal password
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
                console.log(error);
                return resolve(false);
            }

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', NodeMailer.getTestMessageUrl(info));
            return resolve(true);
        });
    });
}

export default router;

