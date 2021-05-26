const User = require("../../../../models/User");
const Wall = require("../../../../models/Walls");
const Technologies = require("../../../../models/Technologies");
const gravatar = require("gravatar");

const config = require("config");
const jwt = require("jsonwebtoken");
const bp = require("bcryptjs");

module.exports = {
  createToken: function createToken(payload) {
    return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "1d" });
  },

  isAuthenticated: async function isAuthenticated(email, password) {
    let user = await User.findOne({ email });
    if (!user) return false;

    const hashPass = user.password;
    const isPasswordCorrect = await bp.compare(password, hashPass);
    return { isPasswordCorrect, user };
  },

  isUser: async function isUser(email) {
    let user = await User.findOne({ email });
    return user ? user : false;
  },

  createUser: async function createUser(user) {
    const { email, name, password } = user;
    technologies = await Technologies.find();
    /* const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });


 */

    const avatar =
      "https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg?cs=srgb&dl=pexels-luriko-yamaguchi-2804282.jpg&fm=jpg";

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const wall = new Wall({
      user: user.id,
      hot: [],
      cold: [],
      pool: technologies,
    });
    await wall.save();

    const salt = await bp.genSalt(10);
    user.password = await bp.hash(password, salt);

    return user;
  },
};
