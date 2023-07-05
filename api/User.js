const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
