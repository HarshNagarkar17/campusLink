const {User} = require("../models");
const {authServices,userServices, tokenServices} = require("../services");
const wrapper = require("../utils/async");

exports.register = wrapper(async(req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateToken(user);
    return res.json({user, tokens});
})

exports.login = wrapper(async (req,res) => {
    const {email, password, tokens} = req.body;
    const user = await authServices.validateUser(email, password);
    const token = await tokenServices.verifyToken(tokens, "access");
    return res.json({user, token});
})

