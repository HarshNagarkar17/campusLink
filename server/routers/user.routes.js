const { all, deleteAll } = require("../controllers/user.controller");
const {emailServices} = require("../services")
const router = require("express").Router();

router.get("/all", all);

router.get("/send-mail/:id", (req, res) => {
    const emailId = req.params.id;
    const otp = emailServices.createOTP(5);
    const email = emailServices.sendMail(emailId, otp);
    return res.send("Email sent!");
})
router.get("/deleteAll", deleteAll);

module.exports = router;