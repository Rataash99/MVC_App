# Inventory Management App

Welcome to the Inventory Management App! This application helps you manage your inventory seamlessly, allowing you to add, update, delete, and view products with ease. Built with Node and Express, it ensures a robust and scalable solution for inventory management.

## Features

- **Add Products:** Easily add new products to your inventory.
- **Update Products:** Update existing product details.
- **Delete Products:** Remove products from the inventory.
- **View Products:** View a list of all products in your inventory.
- **User Authentication:** Secure login and registration for users.
- **Last Visit Tracking:** Track the last visit time for users.

## Tech Stack

- **Frontend:** EJS, Bootstrap
- **Backend:** Express.js, Node.js
- **Database:** In-memory (can be extended to use MongoDB)
- **Middleware:** Multer for file uploads, express-session for session management, express-validator for validation

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/inventory-management-app.git
    cd inventory-management-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3400`

## Usage

### Adding a Product

1. Navigate to the "Add Product" page.
2. Fill in the product details and upload an image.
3. Click "Submit" to add the product to your inventory.

### Updating a Product

1. Navigate to the "Products" page.
2. Click on the "Update" button next to the product you want to update.
3. Modify the product details and click "Submit" to save changes.

### Deleting a Product

1. Navigate to the "Products" page.
2. Click on the "Delete" button next to the product you want to remove.

### User Authentication

1. Register a new account or log in with an existing account.
2. Logged-in users can manage products and track their last visit time.

## Middleware

### Validation Middleware

```javascript
import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required."),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be a Positive Integer."),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required!");
      }
      return true;
    })
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let view = 'new-product'; // default view
    if (req.originalUrl.includes('update-product')) {
      view = 'update-product'; // set view for update-product URL
    }
    return res.render(view, {
      errorMessage: validationErrors.array()[0].msg
    });
  }

  next();
};

export default validateRequest;

### Session Middleware

import session from "express-session";

server.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

### LastVisit Middleware

export const setLastVisit = (req, res, next) => {
  res.cookie('lastVisit', new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};

export const getLastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  next();
};