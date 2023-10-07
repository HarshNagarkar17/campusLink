const {User} = require("../models");


exports.all = async(req, res) => {
    const user = await User.find({});
    return res.json({user})
}

exports.deleteAll = async(req, res) => {
    await User.deleteMany({});
    return res.send("users deleted");
}