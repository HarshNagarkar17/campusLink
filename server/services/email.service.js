const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }, tls: {
        rejectUnauthorized: false
    }
});


const sendMail = async(emailId, otp) => {
    let info = await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to:emailId,
        subject: `Email Verification from campusLink`,
        html:`<h4>Please click on below link to verify your account at campusLink</h4>
        <br> <p>http://localhost:5000/account/verify/${emailId}</p>`
    })

    return info;
}
const createOTP = (length) => {
    const chars = '0123456789';
    const randomBytes = crypto.randomBytes(length);
    const result = new Array(length);
    const byteRange = 256 / chars.length;

    for (let i = 0; i < length; i++) {
        result[i] = chars[Math.floor(randomBytes[i] / byteRange)];
    }

    return result.join('');
}



module.exports = { createOTP, sendMail }