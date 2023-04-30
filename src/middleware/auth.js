const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  
  try {
    console.log("Auth");
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decodedToken._id;
    const user = await User.findOne({ _id, "tokens.token": token });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
