const jwt = require("jsonwebtoken");
exports.isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    req.isAuth = false;
    return next();
  }
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "superSecret");
  } catch (err) {
    isAuth = false;
    return next();
  }

  if (!isVerified) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next();
};
