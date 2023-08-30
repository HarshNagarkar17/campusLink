const { register,all } = require("../controllers/user.controller");

const router = require("express").Router();


router.post("/register",register);
router.get("/all", all);
module.exports = router;