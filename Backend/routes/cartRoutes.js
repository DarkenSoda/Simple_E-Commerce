const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/cart", cartController.getCart);
router.post("/cart", cartController.addItem);
router.put("/cart/:id", cartController.updateItemQuantity);
router.delete("/cart/:id", cartController.removeItem);
router.delete("/cart", cartController.clearCart);

module.exports = router;
