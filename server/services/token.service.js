const jwt = require("jsonwebtoken");
const moment = require("moment");
const {types, keys} = require("../config/")

const createToken = async(userId, expiresIn, type) => {
    const payload = {
        sub:userId,
        iat:moment().unix(),
        expiresIn,
        type
    };
    return jwt.sign(payload, keys.secret);
}
const generateToken = async(user) => {
    const accessTokenTime = moment().add(10, "minutes").format('YYYY-MM-DD HH:mm:ss');
    console.log(accessTokenTime);
    const accessToken = createToken(user.id,accessTokenTime, types.ACCESS);

    return accessToken;
}
const verifyToken = async(token, type) => {
    const tokenDoc = await jwt.verify(token, keys.secret);
    console.log(tokenDoc);
    return tokenDoc;
}
module.exports = {
    generateToken,verifyToken
}
