const { publishPost } = require("../controllers/post.controller");
const {Post} = require("../models")
const router = require("express").Router();
const path = require("path");
// const fs = require("fs");
// const {body} = require("express-validator")
// const util = require("util");
// const writeFileAsync = util.promisify(fs.writeFile); // in case of async file writing

// const validatePostContent = [
//     body("content")
//       .notEmpty()
//       .withMessage("Post must hold some content!!")
//       .isLength({ max: 2000 })
//       .withMessage("Content is too long. Maximum 2000 characters allowed."),
// ];


router.post("/createPost", publishPost);

router.post("/all", async(req, res) => {
    const posts = await Post.find({});
    return res.json({posts});
})

router.get("/publish-post", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "form.html"));
})
module.exports = router;

