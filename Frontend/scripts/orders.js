// Fetch and render order history
function renderOrderHistory() {
	fetch("http://localhost:5000/api/orders")
		.then((response) => response.json())
		.then((orders) => {
			const orderList = document.getElementById("order-list");
			if (orderList) {
				orderList.innerHTML = ""; // Clear existing orders

				orders.forEach((order) => {
					const li = document.createElement("li");
					li.className = "order";

					// Order header
					const orderHeader = document.createElement("div");
					orderHeader.className = "order-header";
					orderHeader.innerHTML = `
						<span>Order ID: ${order.orderId}</span>
						<span>Total: $${order.total}</span>
						<span>Date: ${new Date(order.createdAt).toLocaleString()}</span>
					`;
					li.appendChild(orderHeader);

					// Order items
					const orderItems = document.createElement("ul");
					orderItems.className = "order-items";
					order.items.forEach((item) => {
						const itemLi = document.createElement("li");
						itemLi.innerHTML = `
							<span>${item.productName}</span>
							<span>$${item.productPrice} x ${item.quantity}</span>
						`;
						orderItems.appendChild(itemLi);
					});
					li.appendChild(orderItems);

					orderList.appendChild(li);
				});
			}
		})
		.catch((error) => {
			console.error("Error fetching order history:", error);
		});
}

// Initial render
document.addEventListener("DOMContentLoaded", renderOrderHistory);
