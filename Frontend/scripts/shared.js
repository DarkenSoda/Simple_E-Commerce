// Update cart count in the navbar
function updateCartCount() {
	fetch("http://localhost:5000/api/cart")
		.then((response) => response.json())
		.then((cart) => {
			const cartCount = document.getElementById("cart-count");
			if (cartCount) {
				const totalItems = cart.reduce(
					(sum, item) => sum + item.quantity,
					0
				);
				cartCount.textContent = totalItems;
			}
		});
}

// Initial cart count update
document.addEventListener("DOMContentLoaded", updateCartCount);
