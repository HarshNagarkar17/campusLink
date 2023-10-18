const {User, Group} = require("../models");
const { CustomError } = require("../utils/customError");

/**
 * creates user with email and password
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
const createUser = async(data) => {
    if(data.fullname && typeof data.fulname === 'number')
        throw new CustomError("Name should not be a number", 401);
    if(await User.emailTaken(data.email))
        throw new CustomError("Email already exist", 512); 
    if(data.contact && (await User.contactTaken(data.contact)))
        throw new CustomError("Contact already exist", 512);
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
        throw new CustomError("Group already created", 512);
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
    throw new CustomError("No group exist with this name", 512);
}
const getUserbyId = async(_id) => {
    return User.findOne({_id});
}
const getUserbyEmail = async(email) => {
    return User.findOne({email})
}
module.exports = {createUser, getUserbyEmail, getUserbyId, createGroup, deleteGroup}
