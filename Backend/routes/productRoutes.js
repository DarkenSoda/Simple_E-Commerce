const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Product routes
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);

module.exports = router;
