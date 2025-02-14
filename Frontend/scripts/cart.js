// Add item to cart
function addToCart(productId) {
	fetch("http://localhost:5000/api/cart", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ productId, quantity: 1 }),
	})
		.then(() => {
			updateCartCount();
			if (window.location.pathname.endsWith("cart.html")) {
				renderCart();
			}
		})
		.catch((error) => {
			console.error("Error adding item to cart:", error);
		});
}

// Render cart items
function renderCart() {
	fetch("http://localhost:5000/api/cart")
		.then((response) => response.json())
		.then((cart) => {
			const cartItems = document.getElementById("cart-items");
			const cartTotal = document.getElementById("cart-total");
			if (cartItems) {
				cartItems.innerHTML = "";
				let overallTotal = 0;

				cart.forEach((item) => {
					const li = document.createElement("li");
					const itemTotal = item.price * item.quantity;
					overallTotal += itemTotal;

					li.innerHTML = `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price} x ${item.quantity} = $${itemTotal}</span>
              </div>
              <div class="cart-item-actions">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
              </div>
            </div>
          `;
					cartItems.appendChild(li);
				});

				if (cartTotal) {
					cartTotal.textContent = `Total: $${overallTotal}`;
				}
			}
		})
		.catch((error) => {
			console.error("Error fetching cart:", error);
		});
}

// Increase quantity of a cart item
function increaseQuantity(cartId) {
	fetch(`http://localhost:5000/api/cart/${cartId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ delta: 1 }), // Increase by 1
	})
		.then(() => {
			renderCart();
			updateCartCount();
		})
		.catch((error) => {
			console.error("Error increasing quantity:", error);
		});
}

// Decrease quantity of a cart item
function decreaseQuantity(cartId) {
	fetch(`http://localhost:5000/api/cart/${cartId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ delta: -1 }), // Decrease by 1
	})
		.then(() => {
			renderCart();
			updateCartCount();
		})
		.catch((error) => {
			console.error("Error decreasing quantity:", error);
		});
}

// Remove item from cart
function removeFromCart(cartId) {
	fetch(`http://localhost:5000/api/cart/${cartId}`, {
		method: "DELETE",
	})
		.then(() => {
			renderCart();
			updateCartCount();
		})
		.catch((error) => {
			console.error("Error removing item:", error);
		});
}

// Checkout
async function checkout() {
	try {
		// Fetch the current cart
		const cartResponse = await fetch("http://localhost:5000/api/cart");
		if (!cartResponse.ok) throw new Error("Failed to fetch cart");
		const cart = await cartResponse.json();

		// Prevent checkout if cart is empty
		if (cart.length === 0) {
			alert("Your cart is empty. Add items to proceed with checkout.");
			return;
		}

		// Calculate the total price
		const total = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		// Create the order
		const orderResponse = await fetch("http://localhost:5000/api/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ total }),
		});
		if (!orderResponse.ok) throw new Error("Failed to create order");
		const { orderId } = await orderResponse.json();

		// Create order items
		const orderItemsResponse = await fetch(
			"http://localhost:5000/api/order_items",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orderId,
					items: cart.map(({ product_id, quantity }) => ({
						productId: product_id,
						quantity,
					})),
				}),
			}
		);
		if (!orderItemsResponse.ok)
			throw new Error("Failed to create order items");

		// Clear the cart after successful checkout
		const clearCartResponse = await fetch(
			"http://localhost:5000/api/cart",
			{
				method: "DELETE",
			}
		);
		if (!clearCartResponse.ok) throw new Error("Failed to clear cart");

		// Notify user and update UI
		alert("Checkout successful! Your cart has been cleared.");
		renderCart();
		updateCartCount();
	} catch (error) {
		console.error("Checkout failed:", error);
	}
}


// Initial cart render
document.addEventListener("DOMContentLoaded", renderCart);
