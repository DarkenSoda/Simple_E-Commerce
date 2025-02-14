const Cart = require("../models/Cart");

exports.getCart = (req, res) => {
	Cart.getCart((err, cart) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(cart);
	});
};

exports.addItem = (req, res) => {
	const { productId, quantity } = req.body;
	Cart.addItem(productId, quantity, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Item added to cart" });
	});
};

exports.updateItemQuantity = (req, res) => {
	const { delta } = req.body; // Delta value (1 or -1)
	const cartId = req.params.id;
	Cart.updateItemQuantity(cartId, delta, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Cart updated" });
	});
};

exports.removeItem = (req, res) => {
	const cartId = req.params.id;
	Cart.removeItem(cartId, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Item removed from cart" });
	});
};

exports.clearCart = (req, res) => {
	Cart.clearCart((err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Cart cleared" });
	});
};
