import React, { useEffect } from 'react';
import Featured from './featured'
import SlimPromotion from 'utils/slim.block'
import Loader from 'utils/loader'

import {useDispatch, useSelector} from  'react-redux'
import { productsBySort } from 'store/actions/product.actions';
import CardBlock from 'utils/products/card.blocks'

const slimPromotion = {
    img:'/images/pizza-time-tasty-homemade-traditional-pizza-italian-recipe.jpg',
    //pizza-time-tasty-homemade-traditional-pizza-italian-recipe.jpg
    lineOne:'Up to 40% off',
    linkTitle:'Show Now',
    linkTo:'/shop'
};



const Home = () => {
    const {byPrice} = useSelector(state => state.products)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsBySort({
            limit:4,
            sortBy: 'price',
            order: 'desc',
            where: 'byPrice'
        }));
    }, [dispatch])
    console.log(byPrice)
    
    return (
     <div>
         <Featured></Featured>
         {byPrice?
            <CardBlock 
            items={byPrice}
            title="Luxury in Pizza"></CardBlock>
         :<Loader></Loader>}
         <SlimPromotion items={slimPromotion}/>
     </div>
    )
}

export default Home;