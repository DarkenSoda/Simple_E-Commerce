const db = require("../database/db");

class Product {
	static getAll(callback) {
		db.all("SELECT * FROM products", callback);
	}

	static getById(id, callback) {
		db.get("SELECT * FROM products WHERE id = ?", [id], callback);
	}

	static create(product, callback) {
		const { name, price, image } = product;
		db.run(
			"INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
			[name, price, image],
			callback
		);
	}
}

module.exports = Product;
