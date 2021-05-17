const express = require("express");
const router = express.Router();
const bp = require("bcryptjs");
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @route POST
 * @description log in the user and receive token
 * @access Public
 */

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const payload = {
      user: {
        id: user.id,
      },
    };

    const hashPass = user.password;
    const isPasswordCorrect = await bp.compare(password, hashPass);

    if (isPasswordCorrect) {
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1d" },
        (error, token) => {
          if (error) throw error;

          res.status(200).json({ token });
        }
      );
    } else {
      res.status(400).json({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

module.exports = router;
