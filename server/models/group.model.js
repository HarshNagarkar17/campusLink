const mongoose = require("mongoose");

const groupSchema=mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        trim:true,
    }
});

groupSchema.statics.nameTaken = async function(groupName) {
    const group = await this.findOne({groupName});
    return !!group;
}

const groupModel = mongoose.model("Group", groupSchema);

module.exports = groupModel;