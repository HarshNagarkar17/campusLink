const {User} = require("../models");
const {authServices,userServices, tokenServices} = require("../services");

exports.register = async(req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateToken(user);
    return res.json({user, tokens});
}

exports.login = async (req,res) => {
    const {email, password} = req.body;
    const user = await authServices.validateUser(email, password);
    return res.json({user});
}

