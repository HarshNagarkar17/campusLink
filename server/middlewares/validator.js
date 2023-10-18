const cookieParser = require("cookie-parser");

const verifyUser = (req,res,next) => {
    cookieParser()(req, res, () => {

        const access_token = req.cookies.access_token;
        if(!access_token)
        
            return res.status(401).json({message: "not authenticated"});
        console.log("cookie from user side:", access_token);
        next();
    })
}

module.exports = {verifyUser};