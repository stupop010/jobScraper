const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
