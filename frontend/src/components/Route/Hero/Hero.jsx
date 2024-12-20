import React from "react";
//import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
//import Typed from "react-typed"
//import BasicSlider from "../data/BasicSlider"
import "../../../App.css"
import Carousele from "./Carousel"
//import { ImageData } from '../data/Slider';
const Hero = () => {
  const hero="height-[20vh] bg-black"
  return (
    <>
    <div
      className={`relative mt-[60px] 800px:mt-0 w-full ${styles.noramlFlex}`}>
      <Carousele />      
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