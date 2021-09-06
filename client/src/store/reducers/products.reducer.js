import {
    GET_PROD_BY_PRICE, GET_PROD_PAGINATE,  REMOVE_PRODUCT,  PRODUCT_ADD, CLEAR_PRODUCT_ADD,   GET_PROD_BY_ID, CLEAR_CURRENT_PRODUCT
} from '../types'
export default function productsReducer(state={}, action){
    switch(action.type){
        case GET_PROD_BY_PRICE:
            return {...state, byPrice: action.payload}
        case GET_PROD_PAGINATE:
            return {...state, byPaginate: action.payload}
        case REMOVE_PRODUCT:
            return{ ...state, removeArticle: true}
        case PRODUCT_ADD:
            return {...state, lastAdded: action.payload }
        case CLEAR_PRODUCT_ADD:
            return {...state, lastAdded:null }
        case GET_PROD_BY_ID:
            return {...state, byId: action.payload }
        case CLEAR_CURRENT_PRODUCT:
            return {...state, byId:''}
        default: 
            return state;
    }
}