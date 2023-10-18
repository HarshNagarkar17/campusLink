const {User} = require("../models");
const {userServices} = require("../services")
const wrapper = require("../utils/async");

exports.all = async(req, res) => {
    const user = await User.find({});
    return res.json({user})
}

exports.deleteAll = async(req, res) => {
    await User.deleteMany({});
    return res.send("users deleted");
}   

exports.createNewGroup = wrapper(async(req,res)=>{
    const name = await userServices.createGroup(req.body);
    return res.json({name});
})

exports.deleteGroup = wrapper(async(req, res) => {
    const groupName = req.params.groupName;
    await userServices.deleteGroup(groupName);
    return res.json({message:"Group deleted"})
})