const {User} = require("../models");
const {authServices,userServices, tokenServices, emailServices} = require("../services");
const wrapper = require("../utils/async");

exports.register = wrapper(async(req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateToken(user);
    // const otp = emailServices.createOTP(5);
    emailServices.sendMail(user.id, req.body.email);
    return res.json({user, tokens, message: "Email sent!"});
})

exports.register_faculty = wrapper(async(req, res) => {
        const user = await userServices.createUser(req.body);
        const tokens = await tokenServices.generateToken(user);
        return res.json({user, tokens});       
})

exports.login = wrapper(async (req,res) => {
    const {email, password, tokens} = req.body;
    const user = await authServices.validateUser(email, password);
    const token = await tokenServices.verifyToken(tokens, "access");
    const isFaculty = user.isFaculty === true ? true : false;
    return res.json({user, token, isFaculty});
});


exports.verifyEmail = wrapper(async (req, res) => {
    const id = req.params.id;
    await emailServices.activateUser(id);
    return res.json({message: "user is verified"});
});

