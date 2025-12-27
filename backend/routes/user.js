const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
  logoutUser,
} = require("../controllers/user.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");
router.post("/register", registerUser);
// router.post("/register", (req, res) => {
//   res.send("VICTORY! The Register Route is alive.");
// });
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);
module.exports = router;
