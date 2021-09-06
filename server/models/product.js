const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

//fuer extra toppings neues Modell erzeugen und Linken

//title, price, description, image
const productSchema = mongoose.Schema({
    name: {
        required:true,
        type: String,
        unique: 1,
        maxLength: 100
    },
   description: {
       required: [true, 'You need a description'],
       type: String,
       maxLength: 10000
   },
   price: {
       required: true,
       type: Number,
       maxLength: 255,
   },
   images: {
       type: Array,
       default: []
   }
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product', productSchema)
module.exports = {Product}