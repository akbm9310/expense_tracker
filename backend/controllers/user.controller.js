const User = require("../models/User.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- HELPER: Generate Access & Refresh Tokens ---
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating referesh and access token"
    );
  }
};

// 1. REGISTER USER
// 1. REGISTER USER (Updated with Auto-Login)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(409)
        .json({ success: false, message: "User with email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }

    // --- NEW CODE: GENERATE TOKENS & COOKIES ---
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/", // <--- CRITICAL: Allows cookie on entire site
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options) // Set Access Token
      .cookie("refreshToken", refreshToken, options) // Set Refresh Token
      .json({
        success: true,
        user: createdUser,
        accessToken,
        refreshToken,
        message: "User registered Successfully",
      });
    // -------------------------------------------
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 2. LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid user credentials" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged In Successfully",
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 3. REFRESH TOKEN
exports.refreshAccessToken = async (req, res) => {
  // ... (Your refresh logic here - for now let's keep it simple to fix Register first)
  // If you need the full code again, I can provide it, but let's focus on Register first.
  return res.status(200).json({ message: "Refresh logic placeholder" });
};
// 4. GET CURRENT USER (For Page Reloads)
exports.getCurrentUser = async (req, res) => {
  // The middleware (verifyJWT) has already done the hard work and put the user in req.user
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};
// 5. LOGOUT USER
exports.logoutUser = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    path: "/",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out succesfully" });
};
