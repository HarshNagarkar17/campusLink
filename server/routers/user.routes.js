const { createNewGroup, deleteGroup } = require("../controllers/user.controller");
const { all, deleteAll } = require("../controllers/user.controller");
const { Group } = require("../models");
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
router.post("/createNewGroup", createNewGroup);
router.post("/deleteGroup/:groupName", deleteGroup);

router.get("/all/group", async(req, res) => {
    const groups = await Group.find({});
    return res.json({groups});
})

router.get("/deleteAll/group", async(req, res) => {
    const groups = await Group.deleteMany({});
    return res.json({groups});
})
module.exports = router;