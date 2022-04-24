const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = require("../utils/config");

var kafka = require("../kafka/client");

exports.user_signup_post = async (req, res) => {
  // const { email, name, password } = req.body.data;

  // const hashed_password = bcrypt.hashSync(password, saltRounds);
  // const newUser = new User({
  //   EMAIL: email,
  //   NAME: name,
  //   PASSWORD: hashed_password,
  // });
  // newUser.save(function (err) {
  //   if (err) {
  //     // if (err.name === "MongoError" && err.code === 11000) {
  //     return res.json({ status: "error", error: "Duplicate email" });
  //     // }
  //   } else {
  //     const payload = { _id: newUser._id };
  //     jwt.sign(
  //       payload,
  //       SECRET,
  //       {
  //         expiresIn: 8 * 3600,
  //       },
  //       (err, token) => {
  //         res.json({
  //           status: "ok",
  //           token: "Bearer " + token,
  //           user: newUser,
  //         });
  //       }
  //     );
  //   }
  // });
  kafka.make_request("user-topic", "SIGNUP", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      if (results) {
        res.json({
          status: "ok",
          token: "Bearer " + results.token,
          user: results.user,
        });
      } else {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      }
    }
  });
};

exports.user_login_post = async (req, res) => {
  // const { email, password } = req.body.data;
  // User.findOne({ EMAIL: email }, (error, user) => {
  //   if (error) {
  //     res.json({ status: "error", error: "Error in mongo connection" });
  //   }
  //   if (user) {
  //     bcrypt.compare(password, user.PASSWORD).then((isMatch) => {
  //       if (isMatch) {
  //         const payload = { _id: user._id };
  //         jwt.sign(
  //           payload,
  //           SECRET,
  //           {
  //             expiresIn: 8 * 3600,
  //           },
  //           (err, token) => {
  //             res.json({
  //               status: "ok",
  //               token: "Bearer " + token,
  //               user: user,
  //             });
  //           }
  //         );
  //       }
  //     });
  //   } else {
  //     res.json({ status: "error", error: "User not found" });
  //   }
  // });

  kafka.make_request("user-topic", "LOGIN", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      if (results) {
        res.json({
          status: "ok",
          token: "Bearer " + results.token,
          user: results.user,
        });
      } else {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      }
    }
  });
};

exports.user_edit_profile_put = async (req, res) => {
  // const {
  //   email,
  //   name,
  //   phonenumber,
  //   gender,
  //   DOB,
  //   address,
  //   city,
  //   country,
  //   profilephoto,
  // } = req.body.data;
  // User.findOne({
  //   EMAIL: email,
  // })
  //   .then((user) => {
  //     user.NAME = name ?? "";
  //     user.PHONE_NO = phonenumber ?? "";
  //     user.GENDER = gender ?? "";
  //     user.DOB = DOB ?? "";
  //     user.ADDRESS = address ?? "";
  //     user.CITY = city ?? "";
  //     user.COUNTRY = country ?? "";
  //     user.PROFILE_IMAGE = profilephoto ?? "";
  //     user.save((error) => {
  //       if (error) {
  //         throw error;
  //       }
  //     });
  //     res.json({
  //       status: "ok",
  //       user: user,
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       status: "error",
  //       error: err,
  //       message: "error while updating user",
  //     });
  //   });
  kafka.make_request("user-topic", "EDIT", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        status: "ok",
        user: results,
      });
    }
  });
};

exports.user_add_favourite = async (req, res) => {
  // const { itemId, userId } = req.body.data;
  // User.findOne({
  //   _id: userId,
  // }).then((user) => {
  //   user.FAVOURITES.push(itemId);
  //   user.save();
  //   res.json({
  //     status: "ok",
  //     favourites: {
  //       FAVOURITES: user.FAVOURITES,
  //     },
  //   });
  // });
  kafka.make_request("user-topic", "ADD_FAV", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
        res.json({
          status: "ok",
          favourites: {
            FAVOURITES: results,
          },
        });
      }
    }
  );
};

exports.user_remove_favourite = async (req, res) => {
  // const { itemId, userId } = req.body.data;
  // // console.log(userId, itemId);
  // User.findOne({
  //   userId: userId,
  // }).then((user) => {
  //   user.FAVOURITES.pull(itemId);
  //   user.save();
  //   res.json({
  //     status: "ok",
  //     favourites: {
  //       FAVOURITES: user.FAVOURITES,
  //     },
  //   });
  // });
  kafka.make_request("user-topic", "REMOVE_FAV", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
        res.json({
          status: "ok",
          favourites: {
            FAVOURITES: results,
          },
        });
      }
    }
  );
};

exports.user_get_favourites = async (req, res) => {
  // const userId = req.body.data;
  // // console.log(userId);
  // User.findOne({
  //   _id: userId,
  // })
  //   .populate("FAVOURITES")
  //   .exec()
  //   .then((user) => {
  //     res.json({ status: "ok", favourites: user.FAVOURITES });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  kafka.make_request("user-topic", "GET_FAV", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
        res.json({
          status: "ok",
          favourites: results
        });
      }
    }
  );
};
