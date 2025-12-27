const jwt = require("jsonwebtoken");
const User = require("../models/User.models");

exports.verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("❌ No Token Found");
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ THE FIX: Check for 'id' OR '_id' (Covering all bases)
    const userId = decodedToken._id || decodedToken.id;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      console.log("❌ Token valid, but User not found in DB");
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Error in Middleware:", error.message);
    return res
      .status(401)
      .json({ message: error?.message || "Invalid access token" });
  }
};
