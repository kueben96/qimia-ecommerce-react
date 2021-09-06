import React, {useState} from 'react';
import {renderCardImage, QimiaButton} from '../tools'
import {useSelector, useDispatch} from 'react-redux'
import AddToCartHandler from 'utils/addToCartHandler'
import {userAddToCart} from 'store/actions/user.actions'

const Card = (props) => {
    const [modal, setModal] = useState(false)
    const [errorType, setErrorType] = useState(null);
    const user = useSelector(state=>state.users);
    const dispatch = useDispatch();

    const handleClose = () => setModal(false);

    const handleAddToCart = (item)=>{
        if(!user.auth){
            setModal(true);
            setErrorType('auth')
            return false
        }

        if(!user.data.verified){
            setModal(true);
            setErrorType('verify')
            return false
        }
        dispatch(userAddToCart(item))
       console.log(item)
    }
    return(
        <div className={`card_item_wrapper ${props.grid ? 'grid_bars':''}`}>
            <div className="image"
            style={{
                background: `url(${renderCardImage(props.item.images)})`
            }}>
            </div>
            <div className="action_container">
                <div className="tags">
                    <div className="brand">{props.item.name}</div>
                    <div className="name">{props.item.description}</div>
                    <div className="name">€{props.item.price}</div>
                </div>
                <div className="actions">
                    <div className="button_wrapp">
                        <QimiaButton type="default" altClass="card_link" 
                        title="View product" 
                        linkTo={`/product_detail/${props.item._id}`}
                        style={{fontWeight: 'bold'}}></QimiaButton>
                    </div>
                    <div className="button_wrapp">
                    <QimiaButton type="bag_link" altClass="card_link" 
                        runAction={ ()=> handleAddToCart(props.item)}></QimiaButton>
                    </div>
                </div>

            </div>
            <AddToCartHandler modal={modal} errorType={errorType} handleClose={handleClose}></AddToCartHandler>
        </div>
    )
}

export default Card;