const Transaction = require("../models/Transaction.models.js");
const cloudinary = require("../utils/cloudinary.js");
exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error" + error.message,
    });
  }
};
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "money_manager_uploads",
      });
      imageUrl = result.secure_url;
    }
    const transaction = await Transaction.create({
      text: text,
      amount: amount,
      image: imageUrl,
      userId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    // Check if it was a Validation Error (e.g., missing text)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        // 400 = Bad Request (User's fault)
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        // 500 = Server Fault
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    // 1. Find the transaction by the ID passed in the URL
    const transaction = await Transaction.findById({
      _id: req.params.id,
      userId: req.user.id,
    });

    // 2. Safety Check: Does it exist?
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    // 3. Remove it
    await transaction.deleteOne();

    // 4. Send Success Response
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
