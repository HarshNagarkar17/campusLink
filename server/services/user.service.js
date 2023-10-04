const {User} = require("../models");

/**
 * creates user with email and password
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
const createUser = async(data) => {
    if(await User.emailTaken(data.email))
        throw new Error("Email already exist"); 
    return User.create(data);
}

const getUserbyEmail = async(email) => {
    return User.findOne({email})
}
module.exports = {createUser, getUserbyEmail}
