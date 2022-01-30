const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [
      {
        type: ObjectId,
        progress: {
          type: Number,
          default: 0,
        },
      },
    ],
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    preparingFor: {
      type: String,
      required: true,
    },
    currentClass: {
      type: String,
      required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    occupation: {
      type: String,
      required: true,
    },
    resetToken: String,
    expireToken: Date,
  },
  {
    timestamps: true,
  }
);

var commonsalt = uuidv1();
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = commonsalt;
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  googleautheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_googletoken;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const Users = mongoose.model('USER', userSchema);
module.exports = Users;