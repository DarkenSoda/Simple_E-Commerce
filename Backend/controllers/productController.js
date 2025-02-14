const Product = require("../models/Product");

// Get all products
exports.getAllProducts = (req, res) => {
	Product.getAll((err, products) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(products);
	});
};

// Get a single product by ID
exports.getProductById = (req, res) => {
	const productId = req.params.id;
	Product.getById(productId, (err, product) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(product);
	});
};

// Create a new product
exports.createProduct = (req, res) => {
	const { name, price, image } = req.body;
	if (!name || !price) {
		return res.status(400).json({ error: "Name and price are required" });
	}
	Product.create({ name, price, image }, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(201).json({ message: "Product created successfully" });
	});
};
