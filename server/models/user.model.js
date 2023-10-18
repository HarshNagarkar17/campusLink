const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error("Invalid Email format")
        }
    },
    password:{
        type:String,
        required:true,
        validate(value) {
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/))
                throw new Error("weak password!")
        }
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isFaculty:{
        type:Boolean,
        default:false
    },
    isCoordinator:{
        type:Boolean,
        default:false  
    },
    contact:{
        type:String,
        validate(value){
        if (!value.match(/^\d{10}$/))
            throw new Error('invalid contact number format')
        }
    },
    groupids:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
});

userSchema.pre("save", async function(){
    this.password = bcrypt.hash(this.password, 8);
})

/**
 * checks if email is already taken
 * @param {string} email 
 * @returns {Promise<Boolean>}
 */
userSchema.statics.emailTaken = async function(email) {
    const user = await this.findOne({email});
    return !!user;
}

/**
 * checks if contact is already taken
 * @param {string} contact 
 * @returns {Promise<Boolean>}
 */
userSchema.statics.contactTaken = async function(contact) {
    const user = await this.findOne({contact});
    return !!user;
}
/**
 * checks if passowrds is matching or not
 * @param {string} password 
 * @returns {Promise<Boolean>}
 */
userSchema.methods.matchPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}
const User = mongoose.model("User", userSchema);

module.exports = User;

