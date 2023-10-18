const { authServices, userServices, tokenServices, emailServices } = require("../services");
const wrapper = require("../utils/async");

exports.register = wrapper(async (req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateToken(user);
    emailServices.sendMail(user.id, req.body.email);
    return res.json({ user, tokens, status: "success" });
})

exports.register_faculty = wrapper(async (req, res) => {
    const user = await userServices.createUser(req.body);
    user.isFaculty = true;
    await user.save();
    const tokens = await tokenServices.generateToken(user);
    return res.json({ user, tokens, status:"success" });
})

exports.login = wrapper(async (req, res) => {
    const { email, password, tokens } = req.body;
    const user = await authServices.validateUser(email, password);
    const token = await tokenServices.verifyToken(tokens, "access");
    const isFaculty = user.isFaculty === true ? true : false;
    return res.json({ user, token, isFaculty });
});


exports.verifyEmail = wrapper(async (req, res) => {
    const id = req.params.id;
    const user = await emailServices.activateUser(id);
    const token = await tokenServices.generateToken(user.id);
    res.cookie("access_token", token, { maxAge: 4 * 24 * 60 * 60 * 1000 });
    return res.redirect("/home");
    // return res.json({message: "user is verified"});
});

