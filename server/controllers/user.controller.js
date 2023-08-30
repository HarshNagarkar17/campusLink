const {User} = require("../models");


exports.all = async(req, res) => {
    const user = await User.find({});
    return res.json({user})
}