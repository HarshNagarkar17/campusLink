const router = require("express").Router();
const {verifyUser} = require("../middlewares/validator")

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/", (req, res) => {
    res.send("got it");
})
router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/home",verifyUser, (req,res) => {
    console.log(req.cookies)
    res.render("index")
})
module.exports = router;