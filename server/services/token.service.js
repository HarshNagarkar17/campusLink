const jwt = require("jsonwebtoken");
const moment = require("moment");
const {types, keys} = require("../config/")

const createToken = async(userId, time, type) => {
    const payload = {
        sub:userId,
        iat:moment().unix(),
        exp:time.unix(),
        type
    };
    return jwt.sign(payload, keys.secret);
}
const generateToken = async(user) => {
    const accessTokenTime = moment().add(10, "minutes");
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
