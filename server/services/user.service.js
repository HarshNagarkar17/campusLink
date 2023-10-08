const {User, Group} = require("../models");

/**
 * creates user with email and password
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
const createUser = async(data) => {
    if(await User.emailTaken(data.email))
        throw new Error("Email already exist"); 
    if(data.contact && (await User.contactTaken(data.contact)))
        throw new Error("Contact already exist");
    return User.create(data);
}

/**
 * creates new group with group name
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const createGroup=async(data)=>{
    console.log(data)
    if(await Group.nameTaken(data.groupName))
        throw new Error("Group already created");
    return Group.create(data);
}

/**
 * deletes a specific group
 * @param {String} groupName
 * @returns {Promise<Object>}
 */
const deleteGroup = async(groupName) => {
    if((await Group.nameTaken(groupName)))
        return Group.deleteOne({groupName});
    throw new Error("No group exist with this name");
}
const getUserbyId = async(_id) => {
    return User.findOne({_id});
}
const getUserbyEmail = async(email) => {
    return User.findOne({email})
}
module.exports = {createUser, getUserbyEmail, getUserbyId, createGroup, deleteGroup}
