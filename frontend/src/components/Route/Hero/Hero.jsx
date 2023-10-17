import React from "react";
//import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import HeroSlider,{Slide} from 'hero-slider'
//import Typed from "react-typed"
//import BasicSlider from "../data/BasicSlider"
//import { ImageData } from '../data/Slider';
const Hero = () => {
  return (
    <>
    <div
      className={`relative min-h-[50vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <HeroSlider
    slidingAnimation="left_to_right"
    orientation="horizontal"
    initialSlide={1}
    onBeforeChange={(previousSlide,nextSlide)=>console.log("onBeforeChange",previousSlide,nextSlide)}
    onChange={nextSlide=>console.log("onChange",nextSlide)}
    onAfterChange={nextSlide=>console.log("onAfterChange",nextSlide)}
    style={{
        backgroundColor:"rgba(0,0,0,0.33)"
    }}
    settings={{
        slidingDuration:250,
        slidingDelay:100,
        shouldAutoplay:true,
        shouldDisplayButtons:true,
        autoplayDuration:2000,
        height:"50vh"
    }}
    >
        <Slide 
        background={{
            backgroundImage:"https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:"https://cdn.openpr.com/T/c/Tc15444071_g.jpg",
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:"https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:"https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
            backgroundAttachment:"fixed"
        }}
        />
    </HeroSlider>
    </div>
    </>
  );
};

export default Hero;
/*
<div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <Typed
        strings={[
          "Welcome to squims ecommerce website 🛒",
          "Home of all decorations",
          "Look for any item you need in the store",
          "And am glad you visited the website,Welcome Back 🙂"
        ]}
        typeSpeed={100}
        backSpeed={50}
        loop
        className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[crimson] font-[600] capitalize`}
         />
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
        Open your door to the world of grilling with the sleek Spirit II E-210 gas grill.<br/>
         This two burner grill is built to fit small spaces, <br/>
         and packed with features such as the powerful GS4 grilling system, iGrill capability,<br/>
          and convenient side tables for placing serving trays. Welcome to the Weber squims store.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
 */