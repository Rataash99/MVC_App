import path from 'path';
import { ProductModel } from '../models/product.model.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.get();
        
        // return res.sendFile(
        //     path.join(path.resolve(), "src","views", "products.html") 
        // );

        res.render('products', {products: products});
    }

    getAddForm(req, res){
        return res.render('new-product', {errorMessage : null});
    }

    // before adding something to server we need to validate the data  
    addNewProduct(req, res, next){
        ProductModel.add(req.body);
        let products = ProductModel.get();
        res.render('products', {products});
    } 
}