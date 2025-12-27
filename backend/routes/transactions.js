const express = require("express");
const router = express.Router();

const {
  getTransaction,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller.js");
const upload = require("../middleware/upload");
const { verifyJWT } = require("../middleware/auth.middleware");

router
  .route("/")
  .get(verifyJWT, getTransaction)
  .post(verifyJWT, upload.single("image"), addTransaction);
router.route("/:id").delete(verifyJWT, deleteTransaction);
module.exports = router;
