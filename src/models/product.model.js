export class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.desc = _desc;
    this.name = _name;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
  static getById(id) {
    return products.find((product) => product.id == id);
  }
  static get() {
    return products;
  }
  static update(updatedProduct){
    const index = products.findIndex(product => product.id == updatedProduct.id );
    
    products[index] = updatedProduct;
  }
  static delete(id){
    products = products.filter(product => id != product.id);
    products = products.map((product, index) => {
        return {
            ...product,
            id: index + 1
        };
    })
  }
  static add(name, desc,price, imageUrl) {
    const product = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imageUrl
    );
    products.push(product);
  }
}
let products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
