const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Profile = require("../../../models/Profile");
const User = require("../../../models/User");
const { check, validationResult } = require("express-validator");
const { createProfile } = require("./helper");

/**
 * @route GET api/profile/me
 * @description get current user profile
 * @access private
 */

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ errors: { msg: "There is no profile for this user" } });
    }

    res.status(200).json(profile);
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
 * @route GET api/profile
 * @description get all profiles
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();

    if (!profiles) {
      res.status(400).json({ errors: { msg: "Profile not found" } });
    }
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: { msg: "Something went wrong with our server" } });
  }
});

/**
 * @route GET api/profile/user/user_id
 * @description get  profile by user id
 * @access public
 */

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ errors: { msg: "Profile not found" } });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ errors: { msg: "Profile not found" } });
    }

    res
      .status(500)
      .json({ errors: { msg: "Something went wrong with our server" } });
  }
});

/**
 * @route POST api/profile
 * @description create or update a user profile
 * @access private
 */

router.post("/", auth, async (req, res) => {
  const USER_ID = req.user.id;
  const profileData = req.body;
  const profileFields = createProfile(profileData, USER_ID);

  try {
    let profile = await Profile.findOne({ user: USER_ID });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: USER_ID },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();

    res.json(profile);
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
