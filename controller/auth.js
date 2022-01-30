const User = require("../model/userSchema");
var jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
  const user = new User(req.body);

  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: error,
      });
    }
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });
    res.json({ user, token });
    console.log(user.email);
  });
  //   console.log(user);
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    //if our user is not in the database
    if (err || !user) {
      return res.status(400).json({
        error: "User email doesn't exist",
      });
    }
    // console.log(user.autheticate(password));
    //if the user enters correct password
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "email and password do not match",
      });
    }

    //if all things are Ok now we have to make a token and put it into the cookie
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", token, { expire: new Date() + 999 });
    return res.json({token,user});
  });
};

exports.googlesignin = (req, res) => {
  const { email, googletoken } = req.body;
  User.findOne({ email }, (err, user) => {
    //if our user is not in the database
    if (err || !user) {
      return res.status(400).json({
        error: "User Account Does not exist",
      });
    }

    //if the user enters correct password
    if (!user.googleautheticate(googletoken)) {
      return res.status(401).json({
        error: "email and password do not match",
      });
    }

    //if all things are Ok now we have to make a token and put it into the cookie
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", token, { expire: new Date() + 999 });

    return res.json({
      token,
      user
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Succesfully",
  });
};


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you cant logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET, async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: "you cant logged in" });
    }
    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not an admin, Access Denied",
    });
  }

  next();
};

exports.getUserByEmail = (req, res, next) => {
  User.find({ email: req.body })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
