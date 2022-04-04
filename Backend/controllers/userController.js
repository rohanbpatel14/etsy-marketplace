const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = require("../utils/config");

exports.user_signup_post = async (req, res) => {
  const { email, name, password } = req.body.data;

  const hashed_password = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    EMAIL: email,
    NAME: name,
    PASSWORD: hashed_password,
  });
  newUser.save(function (err) {
    if (err) {
      // if (err.name === "MongoError" && err.code === 11000) {
      return res.json({ status: "error", error: "Duplicate email" });
      // }
    } else {
      const payload = { _id: newUser._id };
      jwt.sign(
        payload,
        SECRET,
        {
          expiresIn: 8 * 3600,
        },
        (err, token) => {
          res.json({
            status: "ok",
            token: "Bearer " + token,
            user: newUser,
          });
        }
      );
    }
  });
};

exports.user_login_post = async (req, res) => {
  const { email, password } = req.body.data;
  User.findOne({ EMAIL: email }, (error, user) => {
    if (error) {
      res.json({ status: "error", error: "Error in mongo connection" });
    }
    if (user) {
      bcrypt.compare(password, user.PASSWORD).then((isMatch) => {
        if (isMatch) {
          const payload = { _id: user._id };
          jwt.sign(
            payload,
            SECRET,
            {
              expiresIn: 8 * 3600,
            },
            (err, token) => {
              res.json({
                status: "ok",
                token: "Bearer " + token,
                user: user,
              });
            }
          );
        }
      });
    } else {
      res.json({ status: "error", error: "User not found" });
    }
  });
};

exports.user_edit_profile_put = async (req, res) => {
  const {
    email,
    name,
    phonenumber,
    gender,
    DOB,
    address,
    city,
    country,
    profilephoto,
  } = req.body.data;
  User.findOne({
    EMAIL: email,
  })
  .then((user) => {
    user.NAME = name ?? "";
    user.PHONE_NO = phonenumber ?? "";
    user.GENDER = gender ?? "";
    user.DOB = DOB ?? "";
    user.ADDRESS = address ?? "";
    user.CITY = city ?? "";
    user.COUNTRY = country ?? "";
    user.PROFILE_IMAGE = profilephoto ?? "";
    user.save((error) => {
      if (error) {
        throw error;
      }
    });
    res.json({
      status: "ok",
      user: user,
    });
  })
  .catch((err) => {
    res.json({
      status: "error",
      error: err,
      message: 'error while updating user'
    });
  });

};
