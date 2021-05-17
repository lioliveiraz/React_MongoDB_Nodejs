const express = require("express");
const router = express.Router();
const { isAuthenticated, createToken } = require("./helpers");

/**
 * @route POST api/login
 * @description log in the user and receive token
 * @access Public
 */

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userObject = await isAuthenticated(email, password);
    if (!userObject) return res.status(404).json({ msg: "User not found" });

    const { isPasswordCorrect, user } = userObject;
    const payload = { user: { id: user.id } };

    if (isPasswordCorrect) {
      const token = createToken(payload);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ msg: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "Something went wrong with our servers, try again latter!",
      },
    });
  }
});

module.exports = router;
