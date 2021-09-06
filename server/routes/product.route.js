const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller')
const auth = require('../middleware/auth')
const {addProductValidator} = require('../middleware/validations')
const formidableMiddleware = require('express-formidable')

router.post('/', auth('createAny', 'product'),addProductValidator,  productsController.addProduct)
router.route('/product/:id')
.get(productsController.getProductById)
.patch(auth('updateAny','product'),productsController.updateProductById)
.delete(auth('deleteAny', 'product'), productsController.deleteProductById)

router.get('/all', productsController.allProducts);

//paginate for filters
router.post('/paginate/all', productsController.paginateProducts);

//images
router.post('/upload', auth('createAny', 'product'), formidableMiddleware(), productsController.picUpload)

//router.delete('/:id', auth('createAny', 'product'), productsController.addProduct)
//get all, delete by id, update by id, post product, add to cart
module.exports = router;

