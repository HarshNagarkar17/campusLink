const { login,register } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register",register);
router.post("/login", login);

router.get("/account/verify/:email", (req,res) => {
    
})
module.exports = router;