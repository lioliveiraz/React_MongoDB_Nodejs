const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Technologies = require("../../../models/Technologies");
const auth = require("../../../middleware/auth");
const {
  findTechAndReturnTotalVotes,
  handleUpdateVotes,
  findTechnology,
  createNewTech,
} = require("./helpers");
/**
 * @route GET api/techs
 * @description Get all the technologies
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const techs = await Technologies.find().sort("-date");
    res.status(200).send({ techs });
  } catch (error) {
    console.error(error);
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

router.put("/vote", auth, async (req, res) => {
  const { id, column } = req.body;
  try {
    const votes = await findTechAndReturnTotalVotes(id, column);
    const updatedVote = votes + 1;
    await handleUpdateVotes(id, updatedVote, column);
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
 * @description register new technology
 * @access Public
 */

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("category", "Category is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let technology;
    const techData = req.body;

    try {
      technology = await findTechnology(techData.name);

      if (technology) {
        return res.status(400).json({
          errors: [
            {
              msg: "Ops!! This technology is already registered. Try another one",
            },
          ],
        });
      }
      technology = await createNewTech(techData);
      const savedTech = await technology.save();

      res.status(200).json({
        message: "Congratulations! You registered a new tech.",
        id: savedTech._id,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Something went wrong with our server. Try again later");
    }
  }
);

module.exports = router;
