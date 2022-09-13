import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

// @desc fetch all products
// @routes  GET /api/products
// @access  public

const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
        })


// @desc fetch single product
// @routes  GET /api/products/:id
// @access  public

      const getProductById =   asyncHandler(async(req,res)=>{
            try {
                const product =await Product.findById(req.params.id);
    
    if(product){
        res.json(product)
    }else{
        res.status(404).json({message : "Product Not Found"})
    }
    
            } catch (error) {
                console.error(error);
                res.status(500).json({message : "Something Went Wrong"})
            }
        })

        export {getProducts,getProductById}