const { login } = require("../controllers/auth.controller");

const router = require("express").Router();


router.post("/login", login);
module.exports = router;