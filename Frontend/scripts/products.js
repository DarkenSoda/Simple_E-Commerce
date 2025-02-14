let products = [];

async function fetchProducts() {
	const response = await fetch("http://localhost:5000/api/products");
	const products = await response.json();
	return products;
}

async function renderProducts() {
	products = await fetchProducts();
	const productList = document.getElementById("product-list");
	if (productList) {
		productList.innerHTML = ""; // Clear existing products
		products.forEach((product) => {
			const productElement = document.createElement("div");
			productElement.className = "product";
			productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
			productList.appendChild(productElement);
		});
	}
}

async function addToCart(productId) {
    const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
    });
    if (response.ok) {
        updateCartCount();
    }
}

document.addEventListener("DOMContentLoaded", renderProducts);