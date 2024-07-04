import express from 'express';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";

import ProductController from './src/controllers/product.controller.js';
import validateRequest from './src/middlewares/validation.middleware.js';

// creating express server
const server = express();

// parse form data because the data will be present in format which browser won't be able to understand that's why we need a parser that converts the data present in req body to convert it into a format understandable by browser.
server.use(express.urlencoded({extended : true}));

// setup view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

const productController = new ProductController();

server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.get('/update-product', productController.getUpdaateProductView);
server.post('/', validateRequest, productController.addNewProduct);

server.use(express.static('src/views'));

server.listen(3400, () => {
    console.log('server is running on port 3400');
})
