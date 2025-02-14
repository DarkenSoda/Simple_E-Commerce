const db = require("../database/db");

class Order {
	// Create a new order
	static create(total, callback) {
		db.run(
			"INSERT INTO orders (total) VALUES (?)",
			[total],
			function (err) {
				if (err) return callback(err);
				callback(null, this.lastID); // Return the order ID
			}
		);
	}

	// Add an item to an order
	static addOrderItem(orderId, productId, quantity, callback) {
		db.run(
			"INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
			[orderId, productId, quantity],
			callback
		);
	}

	static getOrderHistory(callback) {
		db.all(
			`SELECT 
				orders.id AS orderId,
				orders.total,
				orders.created_at,
				order_items.product_id,
				order_items.quantity,
				products.name AS productName,
				products.price AS productPrice
			FROM orders
			INNER JOIN order_items ON orders.id = order_items.order_id
			INNER JOIN products ON order_items.product_id = products.id
			ORDER BY orders.created_at DESC`,
			callback
		);
	}
}

module.exports = Order;
