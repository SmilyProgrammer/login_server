const router = require("express").Router();

// mongodb user module
const User = require("../models/User");

// mongodb user verification module
const UserVarification = require("../models/UserVarification");

// password handler
const bcrypt = require("bcrypt");

// email handler
const nodemailer = require("nodemailer");

// unique string
const { v4: uuidv4 } = require("uuid");

// env variables
require("dotenv").config();

//Signup
router.post("/signup", async (req, res) => {
  let { name, email, password, dateOfBirth } = await req.body;
  name = name.trim();
  email = email.trim();
  password: password.trim();
  dateOfBirth: dateOfBirth.trim();

  if (name == "" || email == "" || password == "" || dateOfBirth == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered!",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is to short!",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid Date of bith entered!",
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User with provided email already exists!",
          });
        } else {
          // Try to create new user

          // Password Handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup Successfully!",
                  });
                })
                .catch((error) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occur while saving user account!",
                  });
                });
            })
            .catch((error) => {
              res.json({
                status: "FAILED",
                message: "An error occur while hasing password!",
              });
            });
        }
      })
      .catch((error) => {
        res.json({
          status: "FAILED",
          message: "An error occur while checking for existing user!",
        });
      });
  }
});

//Export router
module.exports = router;
