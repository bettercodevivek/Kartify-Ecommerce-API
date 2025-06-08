const Product = require('../Models/ProductModel');

// 1. First we will create a handler function to create new products ( will add a middleware so that only admin can do this)

const CreateProduct = async(req,res) => {
    try{
      const {name,description,price,stock,category} = req.body;

      if(!name || !description || !price || !stock || !category){
        return res.status(400).json({error:"Incomplete Details for the product !"})
      }

      const newProduct = new Product({
        name,
        description,
        price,
        stock,
        category,
        createdBy:req.userId
      });

      await newProduct.save();

      res.status(201).json({
        message:"New Product Created Successfully !",
        product:newProduct
      });


    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// 2. Now we will create a handler function to get all products (accessible by everyone)

const getAllProducts = async(req,res) => {
    try{
      
      const products = await Product.find().populate("createdBy","username email"); 

      res.status(200).json({
        message:"All Products fetched successfully !",
        products
      })

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// 3. Now, we will create a handler function to get each product by their Id

const getProductById = async(req,res) => {
     try{
       const id = req.params.id;

       const product = await Product.findById(id).populate("createdBy","username email");

       res.status(200).json({
        message:"Product fetched successfully !",
        product
       });
     }
     catch(err){
        res.status(500).json('Internal Server Error !')
     } 
}

// 4. now we will write the handler function to update a product

const UpdateProduct = async(req,res) => {
    try{
      
      const id = req.params.id;

    //   const {name,description,price,stock,category} = req.body;

      const UpdatedProduct = await Product.findByIdAndUpdate(id,req.body,{
        new:true,runValidators:true
      }) 

       if(!UpdatedProduct){
        return res.status(404).json({error:"Product Not Found !"})
       }

      res.status(200).json({
        message:"product updated successfully !",
        UpdatedProduct
      })

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// 5. now we will write the handler function to delete a product

const DeleteProduct = async(req,res) => {
    try{
       const id = req.params.id;

       const DeletedProduct = await Product.findByIdAndDelete(id);

       if(!DeletedProduct){
        return res.status(404).json({error:"Product not found !"})
       }

       res.status(200).json({
        message:"Product deleted successfully !",
        DeleteProduct
       })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}


module.exports = {CreateProduct,getAllProducts,getProductById,UpdateProduct,DeleteProduct}