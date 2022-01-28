const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
require("../DB/conn");
const Users = require('../model/userSchema');

router.get("/", (req, res) => {
    res.send("Hello World from router");
});

//Using Promises

// router.post("/register", (req, res) => {
//     const { name, username, email, phone, password, cpassword } = req.body;
//     if (!name || !username || !email || !phone || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill all fields properly." });
//     }
//     Users.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "This Email Already Registered." });
//             }
//             Users.findOne({ username: username }).then((userExist) => {
//                 if (userExist) {
//                     return res.status(422).json({ error: "This Username Already Taken." });
//                 }
//                 const user = new Users({ name, username, email, phone, password, cpassword });
//                 user.save().then(() => {
//                     return res.status(201).json({ message: "User Registered Successfully." });
//                 }).catch((err) => res.status(500).json({ error: "Failed to registor." }));
//             }).catch(err => { console.log(err); });
//         }).catch(err => { console.log(err); });
// });

const {
    register
} = require("../controller/users");

router.post("/register", register);

//login route
router.post("/signin", async(req, res) => {
    // console.log(req.body);
    // res.json({ message: "awesome" });
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all fields properly." });
        }
        const userLogin = await Users.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            userLogin.jwtoken = token;
            //auto logoput or using cokie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid" });
            } else {
                // res.json({ message: "User Logged In Successfully" });
                res.json(userLogin);
            }
        } else {
            return res.status(400).json({ error: "Invalid" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/profile", authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("User logged out");
});
module.exports = router;