const db = require("../database/db");

class Cart {
	// Add item to cart or update quantity if it already exists
	static addItem(productId, quantity, callback) {
		db.get(
			"SELECT * FROM cart WHERE product_id = ?",
			[productId],
			(err, row) => {
				if (err) return callback(err);

				if (row) {
					// Item already exists, update quantity
					const newQuantity = row.quantity + quantity;
					db.run(
						"UPDATE cart SET quantity = ? WHERE product_id = ?",
						[newQuantity, productId],
						callback
					);
				} else {
					// Item does not exist, insert new item
					db.run(
						"INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
						[productId, quantity],
						callback
					);
				}
			}
		);
	}

	// Get all cart items
	static getCart(callback) {
		db.all(
			`SELECT cart.id, cart.product_id, products.name, products.price, products.image, cart.quantity 
       FROM cart 
       INNER JOIN products ON cart.product_id = products.id`,
			callback
		);
	}

	// Update item quantity
	static updateItemQuantity(cartId, delta, callback) {
		db.get(
			"SELECT quantity FROM cart WHERE id = ?",
			[cartId],
			(err, row) => {
				if (err) return callback(err);

				if (row) {
					const newQuantity = row.quantity + delta;
					if (newQuantity <= 0) {
						// If quantity is 0 or less, remove the item
						db.run(
							"DELETE FROM cart WHERE id = ?",
							[cartId],
							callback
						);
					} else {
						// Update quantity
						db.run(
							"UPDATE cart SET quantity = ? WHERE id = ?",
							[newQuantity, cartId],
							callback
						);
					}
				} else {
					callback(new Error("Item not found in cart"));
				}
			}
		);
	}

	// Remove item from cart
	static removeItem(cartId, callback) {
		db.run("DELETE FROM cart WHERE id = ?", [cartId], callback);
	}

	// Clear the cart
	static clearCart(callback) {
		db.run("DELETE FROM cart", callback);
	}
}

module.exports = Cart;
