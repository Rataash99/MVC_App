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

    getUpdatedProductView(req, res, next){
        try{
            const {id} = req.params;
            const productFound = ProductModel.getById(id);
            if(productFound){
                res.render('update-product', {product: productFound, errorMessage: null});
            }
            else{
                res.render("product-not-found");
            }
        }
        catch(error){
            next(error);
        }
    }
    deleteProduct(req, res, next){
        const {id} = req.params;
        const productFound = ProductModel.getById(id);
            if(!productFound){
                return res.render('product-not-found');
            }
        ProductModel.delete(id);
        let products = ProductModel.get();
        res.render('products', {products});
    }
    postUpdatedProduct(req, res, next){
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render('products', {products});        
    }
}