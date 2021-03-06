import {
    GET_PROD_BY_PRICE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    GET_PROD_PAGINATE,
    REMOVE_PRODUCT,
    PRODUCT_ADD,
    CLEAR_PRODUCT_ADD,
    GET_PROD_BY_ID,
    CLEAR_CURRENT_PRODUCT,
    USER_ADD_TO_CART
} from '../types'

///  USER

///  USER

export const userAuthenticate = (user) => ({
    type:AUTH_USER,
    payload: user
});

export const userSignOut = () => ({
    type:SIGN_OUT
})
export const userUpdateProfile = (userdata) => ({
    type:UPDATE_USER_PROFILE,
    payload:userdata
})

export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART ,
    payload:data
})


/// PRODUCTS
export const productsByPrice = (data) => ({
    type: GET_PROD_BY_PRICE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PROD_PAGINATE,
    payload: products
})

export const productRemove = () => ({
    type:REMOVE_PRODUCT
})

export const productAdd = (product) => ({
    type: PRODUCT_ADD,
    payload:product
})

export const clearProductAdd = () => {
    return {
        type:CLEAR_PRODUCT_ADD
    }
}
export const productsById = (product) => ({
    type:GET_PROD_BY_ID,
    payload:product
})
export const clearCurrentProduct = () => ({
    type:CLEAR_CURRENT_PRODUCT
})






// NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = (notification) => {
    return (dispatch => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    })
}