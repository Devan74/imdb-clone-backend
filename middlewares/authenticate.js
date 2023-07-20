const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Remove the "Bearer " prefix from the token before verification
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
