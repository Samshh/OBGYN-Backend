const jwt = require("jsonwebtoken");

const authenticateTokenWeb = (req, res, next) => {
  const token = req.cookies.token; 
  console.log(token);
  
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

    res.status(200).json({ message: "Token is valid", user: decoded });
  
    next();
  } catch (ex) {
    console.log("Invalid token");
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = {
  authenticateTokenWeb,
  // ...other exports...
};
