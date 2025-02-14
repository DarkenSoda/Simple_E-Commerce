const Order = require("../models/Order");

exports.createOrder = (req, res) => {
	const { total } = req.body;

	try {
		// Create a new order
		Order.create(total, (err, orderId) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			// Send the response after getting the orderId
			res.status(201).json({ success: true, orderId });
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.createOrderItems = (req, res) => {
	const { orderId, items } = req.body;

	try {
		// all promises
		let promises = [];

		// Add each item in the cart to the order
		items.forEach(({ productId, quantity }) => {
			// make promise
			const addOrderItem = new Promise((resolve, reject) => {
				Order.addOrderItem(orderId, productId, quantity, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});

			// Handle the promise
			promises.push(addOrderItem);
		});

		// Wait for all promises to resolve
		Promise.all(promises)
			.then(() => {
				// Send the response after adding all items to the order
				res.status(201).json({ success: true });
			})
			.catch((err) => {
				res.status(500).json({ error: err.message });
			});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getOrderHistory = (req, res) => {
	Order.getOrderHistory((err, orders) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		// Group orders by orderId
		const groupedOrders = orders.reduce((acc, order) => {
			if (!acc[order.orderId]) {
				acc[order.orderId] = {
					orderId: order.orderId,
					total: order.total,
					createdAt: order.created_at,
					items: [],
				};
			}
			acc[order.orderId].items.push({
				productId: order.product_id,
				productName: order.productName,
				productPrice: order.productPrice,
				quantity: order.quantity,
			});
			return acc;
		}, {});

		// Convert the grouped orders object to an array
		const orderHistory = Object.values(groupedOrders);

		res.json(orderHistory);
	});
};