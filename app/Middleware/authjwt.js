const jwt = require("jsonwebtoken");

const authenticateTokenWeb = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    console.log("Token is valid");
    next(); // Call next() if token is valid
  } catch (ex) {
    console.log("Invalid token");
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = {
  authenticateTokenWeb,
  // ...other exports...
};