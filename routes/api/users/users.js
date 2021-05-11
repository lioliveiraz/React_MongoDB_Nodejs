const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");
const gravatar = require("gravatar");
const bp = require("bcryptjs");
const auth = require("../../../middleware/auth");
const Technologies = require("../../../models/Technologies");
const cors = require("../../../middleware/CORS");
/**
 * @route GET api/users
 * @description get all users
 * @access  private
 */

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

/**
 * @route       POST api/users
 * @description Register user
 * @access      Public
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
    const { name, email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "You are already registered." }],
        });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bp.genSalt(10);
      user.password = await bp.hash(password, salt);

      await user.save();
      res.status(200).json({ msg: "You are registered." });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: {
          msg: "Something went wrong with our servers, try again latter!",
        },
      });
    }
  }
);

module.exports = router;
