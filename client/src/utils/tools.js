import React from 'react';
import {Link} from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import cookie from 'react-cookies';

export const QimiaButton = (props) => {
    let template = "";

    //types of buttons
    switch(props.type){
        case "default":
            template = <Link className={
                !props.altClass ? 'link_default': props.altClass
            }
            to={props.linkTo}
            style={{
               ...props.style
            }}>
                {props.title}
            </Link>
        break;
        case 'bag_link':
            template = <div className="bag_link" onClick={()=>{
                props.runAction()
            }} style={{...props.style}}>
            <AddShoppingCartIcon style={{fontSize: props.iconSize}}/>
            </div>
        break;
        default:
            template="";
    }
    return template;
}

export const renderCardImage = (image) => {
    if(image.length>0){
        return image[0]
    }else {
        return '/images/image_not_availble.png'
    }
}

//Toasts for Error Handling
export const showToast = (type, msg)=>{
    switch(type){
        case 'SUCCESS':
            toast.success(msg, {
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break;
        case 'ERROR':
            toast.error(msg, {
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break; 
        default:
            return false;
    }
}
export const errorHelper = (formik,value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value]:null
});

export const getTokenCookie = () => cookie.load('x-acess-token');
export const removeTokenCookie = () => cookie.remove('x-acess-token', {path:'/'});
export const getAuthHeader = () => {
    return { headers: { 'Authorization':`Bearer ${getTokenCookie()}`}}
}
