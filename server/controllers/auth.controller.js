const {User} = require("../models");
const {authServices,userServices, tokenServices, emailServices} = require("../services");
const wrapper = require("../utils/async");

exports.register = wrapper(async(req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateToken(user);
    const otp = emailServices.createOTP(5);
    const email = emailServices.sendMail(req.body.email, otp);
    return res.json({user, tokens, message: "Email sent!"});
})

exports.login = wrapper(async (req,res) => {
    const {email, password, tokens} = req.body;
    const user = await authServices.validateUser(email, password);
    const token = await tokenServices.verifyToken(tokens, "access");
    return res.json({user, token});
})

