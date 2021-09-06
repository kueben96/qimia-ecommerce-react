import axios from "axios"
import * as actions from './index';
import { getAuthHeader, removeTokenCookie, getTokenCookie } from '../../utils/tools';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const productsBySort = ({limit, sortBy, order,where}) => {
    return async(dispatch)=>{
        console.log("async action")
        try{
            const products = await axios.get(`/api/products/all`,{
                params: {
                    limit,
                    sortBy,
                    order
                }
            });
            switch(where){
                case 'byPrice':
                    dispatch(actions.productsByPrice(products.data))
                break;
                default:
                    return false;
            }
            
            console.log(products)
        } catch(error){
            console.log(error.response.data.message)
            dispatch(actions.errorGlobal('Sorry, something happened, try again'))
        }
    }
} 

export const productsByPaginate = (args) => {
    return async(dispatch)=> {
        try{
            const products = await axios.post('/api/products/paginate/all', args)
            dispatch(actions.productsByPaginate(products.data));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productRemove = (id) => {
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/products/product/${id}`,getAuthHeader())
            dispatch(actions.productRemove())
            dispatch(actions.successGlobal());
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
} 
export const productAdd = (data) => {
    return async(dispatch)=>{
        try{
            const product= await axios.post(`/api/products/`,data,getAuthHeader())

            dispatch(actions.productAdd(product.data))
            dispatch(actions.successGlobal());
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
} 

export const productsById= (id) => {
    return async(dispatch)=>{
        try{
            const product =await axios.get(`/api/products/product/${id}`);
            dispatch(actions.productsById(product.data));
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
} 

export const productEdit = (values, id) => {
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/products/product/${id}`,values,getAuthHeader());

            dispatch(actions.successGlobal('Update done !!'));
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
} 