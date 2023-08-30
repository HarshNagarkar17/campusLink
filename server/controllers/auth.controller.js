const {User} = require("../models");
const {authServices} = require("../services");


exports.login = async (req,res) => {
    const {email, password} = req.body;
    const user = await authServices.validateUser(email, password);
    return res.json({user});
}

