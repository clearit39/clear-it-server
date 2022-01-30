const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { signin,
signup,
} = require("../controller/auth");
const authenticate = require("../middleware/authenticate");
require("../DB/conn");
const Users = require('../model/userSchema');

router.get("/", (req, res) => {
    res.send("Hello World from router");
});


router.post("/register", signup);

//login route
router.post("/signin", signin);

router.get("/profile", authenticate, (req, res) => {
    res.send(req.rootUser);
});

module.exports = router;