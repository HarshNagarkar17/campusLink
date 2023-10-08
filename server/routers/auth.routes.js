const { login,register, verifyEmail, register_faculty } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register",register);
router.post("/login", login);
router.post("/register_faculty", register_faculty);
router.get("/account/verify/:id", verifyEmail);
module.exports = router;