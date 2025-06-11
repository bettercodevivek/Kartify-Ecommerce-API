# Kartify - E-commerce Backend API

Kartify is a RESTful backend API for an e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**.  
This project covers user authentication, product management, cart operations, order processing, role-based access control, and more.

---

## 🛠 Features

- User Signup, Login, and JWT-based Authentication (Access & Refresh Tokens)
- Role-based Authorization (Admin, User)
- Product CRUD Operations (Create, Read, Update, Delete)
- Cart Management (Add, Update, Remove Items)
- Order Placement and Order History
- Secure Password Hashing with bcrypt
- Middleware for Authentication and Role Authorization
- Environment variable based configuration
- Proper error handling and validation

---

## 🧰 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cookie-parser

---
## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/kartify.git
cd kartify
```

2. install required dependencies
```bash
   npm install
```

3. Create a .env file in the root folder and add your environment variables

4. Start the server
```bash
   npm start
```

## Folder Structure
```bash
kartify/
├── config/            # DB config and env setup
├── controllers/       # Route handler logic
├── middlewares/       # Auth, error handling, etc.
├── models/            # Mongoose models
├── routes/            # All route files
├── utils/             # Utility functions
├── app.js             # Main Express app
└── server.js          # Server entry point
```

## 🧪 API Endpoints Overview

### 🔑 Auth Routes

| Method | Endpoint                  | Description                   |
|--------|---------------------------|-------------------------------|
| POST   | `/api/auth/signup`        | Register a new user           |
| POST   | `/api/auth/login`         | Login and receive tokens (access + refresh)     |
| GET    | `/api/auth/refresh-token` | Issue new access token        |

---

### 🛍️ Product Routes (Admin Only for write access)

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/products/view`      | Get all products     |
| POST   | `/api/products/create`    | Create a new product |
| GET    | `/api/products/view/:id`  | Get product by ID    |
| PUT    | `/api/products/update/:id`  | Update a product     |
| DELETE | `/api/products/delete/:id`  | Delete a product     |

---

### 🛒 Cart Routes

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| GET    | `/api/cart`        | Get items in user’s cart  |
| POST   | `/api/cart`        | Add cart items     |
| PUT | `/api/cart/:id`    | Update item in the cart     |
| DELETE | `/api/cart/:id`    | Remove item from cart     |

---

### 📦 Order Routes

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/api/orders`      | Place a new order          |
| GET    | `/api/orders`      | Get user’s order history   |

---

> ℹ️ **Note:** All protected routes require a valid JWT access token in the Authorization header:  

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

Made with ❤️ by **Vivek Singh**

- 🔗 GitHub: [github.com/viveksingh](https://github.com/bettercodevivek)
---



   
