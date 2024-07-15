import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";

import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import validateRegisterRequest from "./src/middlewares/validateRegistration.middleware.js";

// creating express server
const server = express();

// parse form data because the data will be present in format which browser won't be able to understand that's why we need a parser that converts the data present in req body to convert it into a format understandable by browser.
server.use(express.urlencoded({ extended: true }));

// setup view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
server.use(express.static("public"));

const productController = new ProductController();
const usersController = new UserController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.get("/update-product/:id", productController.getUpdatedProductView);
server.get('/register', usersController.getRegister);
server.get('/login', usersController.getLogin);

server.post("/delete-product/:id", productController.deleteProduct);
server.post(
  "/",
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.addNewProduct
);
server.post(
    "/update-product",
    uploadFile.single("imageUrl"),
  productController.postUpdatedProduct
);
server.post(
    "/register",
    validateRegisterRequest, 
    usersController.postRegister
);
server.post('/login', usersController.postLogin)

server.use(express.static("src/views"));

server.listen(3400, () => {
  console.log("server is running on port 3400");
});
