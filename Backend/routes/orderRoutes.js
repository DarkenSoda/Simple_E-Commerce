const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Create an order
router.post("/orders", orderController.createOrder);
router.post("/order_items", orderController.createOrderItems);
router.get("/orders", orderController.getOrderHistory);

module.exports = router;
