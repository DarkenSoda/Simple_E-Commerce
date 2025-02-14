# E-Commerce Store

This is a simple e-commerce store built with **HTML/CSS/JavaScript** for the frontend and **Express.js** with **SQLite** for the backend. The application allows users to browse products, add them to a shopping cart, and complete the checkout process. It also includes an order history page where users can view their past orders.

---

## Features

- **Product Listing**: Display a list of products with their name, price, and image.
- **Shopping Cart**: Add/remove products, update quantities, and view the total price.
- **Checkout**: Complete the checkout process and clear the cart.
- **Order History**: View past orders with their associated items.
- **Product Management**: Fetch products from the database.
- **Cart Management**: Add/remove items, update quantities, and clear the cart.
- **Order Management**: Create orders, add order items, and fetch order history.

---

## Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/DarkenSoda/Simple_E-Commerce.git
cd Simple_E-Commerce
```

### **2. Install Dependencies**

Navigate to the `backend` directory and install the required dependencies:

```bash
cd backend
npm install
```

### **3. Start the Backend Server**

From the `backend` directory, start the server:

```bash
node app.js
```

The server will run on `http://localhost:5000`.

### **4. Opening the app**

Open the `index.html` web page that is located in the `frontend` directory.

---

## API Endpoints

### **Products**

- **GET `/api/products`**: Fetch all products.

### **Cart**

- **GET `/api/cart`**: Fetch all items in the cart.
- **POST `/api/cart`**: Add an item to the cart.
- **PUT `/api/cart/:id`**: Update the quantity of an item in the cart.
- **DELETE `/api/cart/:id`**: Remove an item from the cart.
- **DELETE `/api/cart`**: Clear the cart.

### **Orders**

- **GET `/api/orders`**: Fetch all orders with their items.
- **POST `/api/orders`**: Create a new order.

---

## Usage

1. **Home Page**:
   - Browse products and add them to the cart.

2. **Shopping Cart**:
   - View items in the cart, update quantities, or remove items.
   - Proceed to checkout.

3. **Checkout**:
   - Complete the checkout process to create an order and clear the cart.

4. **Order History**:
   - View past orders and their associated items.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
