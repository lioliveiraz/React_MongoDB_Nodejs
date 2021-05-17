const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Technologies = require("../../../models/Technologies");
const User = require("../../../models/User");
const cors = require("../../../middleware/CORS");
const auth = require("../../../middleware/auth");

/**
 * @route GET api/techs
 * @description Get all the technologies
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const techs = await Technologies.find().sort("-date");
    res.status(200).send({ techs });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong with our server. Try again later");
  }
});

/**
 * @route PUT api/techs/vote
 * @description increase or decrease the technology vote
 * @access private
 */

router.put("/vote", async (req, res) => {
  const { id, userVote } = req.body;
  const tech = await Technologies.findById({ _id: id });
  const updatedVotes = tech.votes + userVote;
  try {
    const filter = { _id: id };
    const update = { votes: updatedVotes };
    const tech = await Technologies.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong with our server. Try again later");
  }
});

/**
 * @route POST api/techs
 * @description post new technology
 * @access Public
 */

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let technology;
    const { name, description, creator, image } = req.body;
    const date = new Date();
    const votes = 0;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      technology = await Technologies.findOne({ name });

      if (technology) {
        return res.status(400).json({
          errors: [
            { msg: "Ops!! This Tech is already registered. Try another one" },
          ],
        });
      } else {
        technology = new Technologies({
          name,
          description,
          creator,
          votes,
          image,
          date,
        });

        image
          ? (technology.image = image)
          : (technology.image = "https://via.placeholder.com/300/09f/fff.png");
        const savedTech = await technology.save();
        res.status(200).json({
          message: "Congratulations!You registered a new tech.",
          id: savedTech._id,
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Something went wrong with our server. Try again later");
    }
  }
);

module.exports = router;
