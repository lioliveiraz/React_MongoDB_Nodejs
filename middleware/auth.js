const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization;

  if (token === undefined || token.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ error: { msg: "Authorization denied" } });
  }

  try {
    const decoded = await jwt.verify(
      token.split(" ")[1],
      config.get("jwtSecret")
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ errors: { msg: "Token is not valid" } });
  }
};
