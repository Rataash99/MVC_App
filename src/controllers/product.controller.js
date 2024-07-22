import path from 'path';
import { ProductModel } from '../models/product.model.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.get();
        
        // return res.sendFile(
        //     path.join(path.resolve(), "src","views", "products.html") 
        // );

        res.render('products', {products, userEmail: req.session.userEmail});
    }

    getAddForm(req, res){
        return res.render('new-product', {errorMessage : null, userEmail: req.session.userEmail});
    }

    // before adding something to server we need to validate the data  
    addNewProduct(req, res, next){
        const {name, desc, price} = req.body;
        const imageUrl = "images/" + req.file.filename; // when using multer we need to specify url as now it is getting saved into different location and not getting directly via UI.
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.get();
        res.render('products', {products, userEmail: req.session.userEmail});
    } 

    getUpdatedProductView(req, res, next){
        try{
            const {id} = req.params;
            const productFound = ProductModel.getById(id);
            if(productFound){
                res.render('update-product', {product: productFound, errorMessage: null, userEmail: req.session.userEmail});
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
        res.render('products', {products, userEmail: req.session.userEmail});
    }
    postUpdatedProduct(req, res, next){
        const {name, desc, price} = req.body;
        const imageUrl = "images/" + req.file.filename; // when using multer we need to specify url as now it is getting saved into different location and not getting directly via UI.
        req.body.imageUrl = imageUrl;
        // console.log(req.body);
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render('products', {products, userEmail: req.session.userEmail});        
    }
}