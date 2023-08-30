const {User} = require("../models");
const {authServices,userServices} = require("../services");

exports.register = async(req, res) => {
    const user = await userServices.createUser(req.body);
    return res.json({user});
}

exports.login = async (req,res) => {
    const {email, password} = req.body;
    const user = await authServices.validateUser(email, password);
    return res.json({user});
}

