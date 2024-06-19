import express from 'express';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";

import ProductController from './src/controllers/product.controller.js';

// creating express server
const server = express();

// setup view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

const productController = new ProductController();

server.get('/', productController.getProducts);
server.use(express.static('src/views'));

server.listen(3400, () => {
    console.log('server is running on port 3400');
})
