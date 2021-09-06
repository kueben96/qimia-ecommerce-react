const { Product } = require("../models/product")
const {ApiError} = require('../middleware/apiError')
const httpStatus = require('http-status');
//const {mongoose} = require('mongoose')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dumurrarb', 
    api_key: '137289928415646', 
    api_secret: `${process.env.CN_API_SECRET}`
})

const addProduct = async(body)=>{
    try{
        const product =  new Product({
            ...body
        });
        await product.save()
        return product;
    }catch(error){
        throw error
    }
}

const getProductById = async(_id)=>{
    try{
       const product = await Product.findById(_id);
       if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not Found');
       return product; 

    }catch(error){
        throw error
    }
}

const updateProductById = async(_id, body)=>{
    try{
        const product = await Product.findOneAndUpdate(
            {_id},
            { "$set": body },
            { new: true } 
        );
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product; 
    }catch(error){
        throw error
    }
}
const deleteProductById = async(_id)=>{
    try{
        const product = await Product.findByIdAndRemove(_id);
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product; 
    }catch(error){
        throw error
    }
}

const allProducts = async(req)=>{
    try{
        const products = await Product.find({}).sort([
            [req.query.sortBy, req.query.order]
        ]).limit(parseInt(req.query.limit));
        return products; 
    }catch(error){
        throw error
    }
}

const paginateProducts = async(req)=>{
    try{

        // const example = {
        //     "keywords": "elite",
        //     "brand": ["324342", "snsn343433"],
        //     //lower than
        //     "min": 200,
        //     "max": 500,
        //     "frets": 23
        // }

        let aggQueryArray = [];
        //if you dont add anything to the array you dont get anythingn to aggregate
        if(req.body.keywords && req.body.keywords != '' ){
            const re = new RegExp(`${req.body.keywords}`, 'gi');
            aggQueryArray.push({
                $match: { name: { $regex: re }}
            });
        }
        if(req.body.description && req.body.description != '' ){
            const re = new RegExp(`${req.body.description}`, 'gi');
            aggQueryArray.push({
                $match: { description: { $regex: re }}
            });
        }

        if(req.body.min && req.body.min > 0 || req.body.max && req.body.max < 200){
            /// { $range: { price:[0,100 ]}} /// not supported

            if(req.body.min){
                aggQueryArray.push({ $match: { price:{ $gt: req.body.min }}});
            }
            if(req.body.max){
                aggQueryArray.push({ $match: { price:{ $lt: req.body.max }}});
            }
        }
        /////
        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page: req.body.page,
            limit:4,
            sort:{price:'asc'}
        }
        const products = await Product.aggregatePaginate(aggQuery, options);
        return products;
    }catch(error){
        throw error
    }
}

const picUpload = async(req) =>{
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.path, {
            public_id: `${Date.now()}`,
            folder: 'qimia_uploads'
        });
        return {
            public_id: upload.public_id,
            url: upload.url
        }
    } catch(error){
        throw(error)
    }
}


module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    picUpload
};