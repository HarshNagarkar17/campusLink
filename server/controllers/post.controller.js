const wrapper = require("../utils/async");
const { Post } = require("../models");
const sanitizeHtml = require("sanitize-html");


exports.publishPost = wrapper(async (req, res) => {
    if(!req.body.content || req.body.content.length <= 0)
        throw new Error("Post must hold some content!!");
    const sanitizedContent = sanitizeHtml(req.body.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["br", "p", "a", "h1"]),
        allowedAttributes: {},
    });
    console.log(req.body.content, sanitizedContent);

    const post = await Post.create({
        content: sanitizedContent,
        postedIn: req.body.postedIn,
    });

    const content = post.content + "<br>Category: " + post.postedIn;
    res.send(content);
    
    // saveContentToFile(content); 

})
