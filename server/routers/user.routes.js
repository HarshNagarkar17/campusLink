const { all } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/all", all);
module.exports = router;