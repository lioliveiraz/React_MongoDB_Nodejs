const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Wall = require("../../../models/Walls");

/**
 * @route GET api/wall/me
 * @description get the data for the user wall
 * @access private
 */

router.get("/me", auth, async (req, res) => {
  const user = req.user.id;

  try {
    const wall = await Wall.findOne({ user });
    res.status(200).json(wall);
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
 * @route UPDATE api/wall/update-wall
 * @description update the wall data
 * @access private
 */

router.put("/update-wall", auth, async (req, res) => {
  const user = req.user.id;
  let updatedWall = req.body;
  updatedWall["user"] = user;

  try {
    let wall = await Wall.findOneAndUpdate(
      { user },
      { $set: updatedWall },
      { new: true }
    );
    wall.save();
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
