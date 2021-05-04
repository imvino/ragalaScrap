const nodemailer = require("nodemailer");
async function sendMail(req) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'webpistol@gmail.com', // generated ethereal user
            pass: 'Asd@4321', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        from: req.from, // sender address
        to: req.to, // list of receivers
        subject: req.subject, // Subject line
        //text: "Hello world?", // plain text body
        html: req.html, // html body
    });
    if(info.messageId){
       console.log('mail sent')
    }else{
        console.log('mail not sent')
    }

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports= sendMail