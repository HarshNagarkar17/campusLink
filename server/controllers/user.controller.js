const {User} = require("../models");
const {userServices} = require("../services")

exports.register = async(req, res) => {
    const user = await userServices.createUser(req.body);
    return res.json({user});
}


exports.all = async(req, res) => {
    const user = await User.find({});
    return res.json({user})
}