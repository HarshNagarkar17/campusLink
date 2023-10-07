const { publishPost } = require("../controllers/post.controller");
const {Post} = require("../models")
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
router.post("/createPost",async(req, res) => {
    try {
        if(!req.body.content || req.body.content.length <= 0 ){
            throw new Error("Post must hold some content!!")
        }
        const post = await Post.create(req.body);
        const content = post.content + "<br>Category: " + post.postedIn;
        await writeFileAsync("./post.html", content)
        return res.sendFile(path.join(__dirname, "..", "post.html"));
    } catch (error) {
        console.error(error);
        res.status(500).send("<h1>Internal Server Error</h1>");
    }
});

router.get("/publish-post", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "form.html"));
})
module.exports = router;

