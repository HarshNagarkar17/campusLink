const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { User } = require("../models");
const { userServices } = require(".");

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


const sendMail = async(userId,emailId) => {
    let info = await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to:emailId,
        subject: `Email Verification from campusLink`,
        html:`<h4>Please click on below link to verify your account at campusLink</h4>
        <br> <p>http://localhost:5000/api/account/verify/${userId}</p>`
    });
}

const activateUser = async(_id) => {

    // const user = await User.findOneAndUpdate({_id, isActive:false}, {$set: {isActive:true}}, {new:true});
    const user = await User.findOne({_id});

    if(!user)
        throw new Error("User not found or already verified!");

    if(user.isActive)
        throw new Error("User is already verified");
    user.isActive = true;
    await user.save();
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



module.exports = { createOTP, sendMail, activateUser }