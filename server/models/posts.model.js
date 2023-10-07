const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    // content, postedBy,createdTime, inWhichCategory, holdsImages
    content:{
        type:String,
        trim:true
    },
    postedIn:{
        type:Number,
        enum:[1,2,3,4,5]
    }   
}, {
    timestamps:true
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;