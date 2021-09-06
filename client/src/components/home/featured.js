import React from 'react';
import Carrousel from 'utils/carrousel'


const Featured = () =>{

    const carrouselItems = [
        {
            img:'/images/side-view-of-delicious-pizza-with-tomatoes-greens-on-stained-white-surface.jpg',
            lineOne: 'Italian Dreams',
            lineTwo: 'Custom shop',
            lineTitle: 'Shop Now',
            linkTo: '/shop'
        },
        {
            img:'/images/top-view-of-pepperoni-pizza-sliced-into-six-slices.jpg',
            lineOne: 'Spicy Peperoni',
            lineTwo: 'Custom shop',
            lineTitle: 'Shop Now',
            linkTo: '/shop'
        }
    ]
    return (
        <div className="featured_container">
            <Carrousel items={carrouselItems}/>
        </div>
    )
}

export default Featured;