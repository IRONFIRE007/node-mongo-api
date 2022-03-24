import Product from '../models/Products'


export const createProducts = async(req, res) => {
    
    const {name,category,price,imgUrl} = req.body;

    const newProduct =new Product({name, category, price, imgUrl});

    const productSaved = await newProduct.save(); 

    res.status(201).json(productSaved);

}


export const getProducts = async(req, res) => {

        const products = await Product.find();
        res.json(products);
}


export const getProductsById = async(req, res) => {
   
    let {id}  = req.params;
   const product = await Product.findById(id.trim());
     res.status(200).json(product);
    

}

export const updateProductsById = async(req, res) => {

    let {id}  = req.params;
const updateProduct = await Product.findByIdAndUpdate(id.trim(),req.body,{new:true });

res.status(200).json(updateProduct);

}


export const deleteProductsById = async(req, res) => {

    let {id}  = req.params;

 await Product.findByIdAndDelete(id.trim());
  
             
    res.status(204).json();

}
