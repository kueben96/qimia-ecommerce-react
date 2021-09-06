import React from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {QimiaButton} from 'utils/tools'

const Carrousel = ({items}) =>{
    const settings = {
        dot: false, 
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }
    const generateSlides = () => (
        items?
            items.map((item, i)=>(
                <div key={i}>
                    <div className="featured_image"
                    style={{
                        background:`url(${item.img})`,
                        height: `${window.innerHeight}px`,
                        //width: `${window.innerWidth}px`,
                        backgroundSize: `cover`,
                        "background-repeat": "no-repeat",
                        "background-position": "center"
                    }}>  
                    <div className="featured_action">
                        <div className="tag title">
                            {item.lineOne}
                        </div>
                        <QimiaButton type="default" 
                        title={item.lineTitle} linkTo={item.linkTo}></QimiaButton>
                    </div>
                    </div>
                </div>
            ))
        :null
    )
    return (
        <Slider {...settings}>
            {generateSlides()}
        </Slider>
    )
}

export default Carrousel;