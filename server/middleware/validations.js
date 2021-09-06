const {check, validationResult} = require('express-validator')
const httpStatus = require('http-status')

//first put into the array all the things you want to check
//bail(): check the nex thing
//simple, but you need to know the methods, look in docs
//need to add a callback function for next as last element of array
const addProductValidator = [
    check('name').trim().not().isEmpty().withMessage('You need to add a name').bail()
    .isLength({min:3}).withMessage('Minimum 3 charakter required').bail(),

    //next one
    check('price')
    .trim().not().isEmpty().withMessage('you need to add a price'),

    (req, res, next)=>{
        const errors = validationResult(req);
        //if erros is not empty, it means we have errors
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        //next() if no erros, then go to the controller
        next()
        
    }
];

module.exports = {
    addProductValidator
}