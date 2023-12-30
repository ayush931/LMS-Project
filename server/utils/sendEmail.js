import nodemailer from 'nodemailer'

// async.. await is not allowed in global scope, must use a wrapper

const sendEmail = async function (email, subject, message) {
    
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
        host: process.env.STMP_HOST,
        port: process.env.STMP_PORT,
        secure: false, // true for 465, false for other port
        auth: {
            user: process.env.STMP_USERNAME,
            pass: process.env.STMP_PASSWORD,
        },
    })

    // send mail with defined transport object

    await transporter.sendMail({
        from: process.env.STMP_FROM_EMAIL, // sender address
        to: email, // user email
        subject: subject, // subject line
        html: message // html body
    })
}

export default sendEmail