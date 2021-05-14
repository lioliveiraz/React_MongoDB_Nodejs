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

  const wall = await Wall.findOne({ user });
  console.log(wall);
});

module.exports = router;
