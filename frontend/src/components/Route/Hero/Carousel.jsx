import React from 'react'
import {Carousel} from "react-responsive-carousel"

const img1 = "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699401600&semt=ais";
const img2 = "https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg";
const img3 = "https://cdn5.vectorstock.com/i/1000x1000/52/04/online-shopping-e-commerce-banner-concept-vector-25035204.jpg";
const img4 = "https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559464.jpg";
const Carousele = () => {
  return (
    <div>
        <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <div>
                <img src={img1} alt="" />
            </div>
            <div>
                <img src={img2} alt="" />
            </div>
            <div>
                <img src={img3} alt="" />
            </div>
            <div>
                <img src={img4} alt="" />
            </div>
        </Carousel>
    </div>
  )
}

export default Carousele