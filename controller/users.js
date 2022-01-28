const User = require("../model/userSchema")
const jwt = require("jsonwebtoken");


exports.register = async(req, res) => {
    const user = new User(req.body);
    await user.save(async(error, user) => {
        console.log(error);
        console.log(user)
        if (error) {
            console.log(error);
            return await res.status(400).json({
                error: error,
            });
        } else {
            var token = jwt.sign({ _id: user._id }, "mukul");
            await res.cookie("token", token, { expire: new Date() + 9999 });
            // const token = "ubdrf7634y0t83547ytw9845yt";
            await res.json({ user, token });
        }
    })
}

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: err,
            });
        }
        req.profile = user;
        next();
    });
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json(users);
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};

exports.deleteUser = (req, res) => {
    User.findOneAndRemove({ _id: req.profile._id }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to delete this user",
            });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
    });
};