import React from "react";
//import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
//import Typed from "react-typed"
import BasicSlider from "../data/BasicSlider"
//import { ImageData } from '../data/Slider';
const Hero = () => {
  return (
    <>
    <div
      className={`relative overflow-hidden h-[120px] 800px:h-[50vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="w-full h-[100%] top-0 bottom-0 m-3 !mr-3 border border-gray-50 rounded-sm">
      <BasicSlider />
      </div>
      
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