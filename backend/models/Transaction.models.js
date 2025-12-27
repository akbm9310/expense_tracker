const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please add some text"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive or negative number"],
    },
    image: {
      type: String,
      required: [true, "Please upload an image"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
