const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");
const { isUser, createUser } = require("./helpers");

/**
 * @route GET api/users
 * @description get all users
 * @access  public
 */

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

/**
 * @route       POST api/users
 * @description Register new user
 * @access      public
 */

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .not()
      .isIn(["1234", "password", "god", "mother"])
      .withMessage("Do not use a common word as the password")
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const userData = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user;
      user = await isUser(req.body.email);
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "You are already registered." }],
        });
      }
      user = await createUser(userData);
      await user.save();
      res
        .status(200)
        .json({ msg: `Hello, ${user.name}! You have been registered.` });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errors: {
          msg: "Something went wrong with our servers, try again latter!",
        },
      });
    }
  }
);

module.exports = router;
