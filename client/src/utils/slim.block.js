import React from 'react';
import { QimiaButton } from './tools'

const SlimPromotion = ({ items }) => {


    const renderPromotion = () => (
        items ?

            <div className="slim_promotion_img"
                style={{
                    background: `url(${items.img})`
                }}
            >
                <div className="slim_promotion_slogan">
                <div className="tag title">{items.lineOne}</div>
                <div className="btn">
                    <QimiaButton
                        type="default"
                        title={items.linkTitle}
                        linkTo={items.linkTo}
                    />
                </div>
                </div>
                
            </div>


            : null
    )

    return (
        <div className="slim_promotion">
            {renderPromotion()}
        </div>
    )



}

export default SlimPromotion;