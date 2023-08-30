const {User} = require("../models");
const userService = require("./user.service")

/**
 * Validate user with email and password
 * @param {string} email 
 * @param {string} passsword 
 * @returns {Promise<Object>}
 */
const validateUser = async(email, passsword) => {
    const user = await userService.getUserbyEmail(email);

    if(!user || !(await user.matchPassword(passsword)))
        throw new Error("Incorrect email or password");
    return user;
}


module.exports = {
    validateUser
};

