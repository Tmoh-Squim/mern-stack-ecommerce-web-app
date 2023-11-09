import React from "react";
import HeroSlider, { Slide, Nav } from "hero-slider";
import "../../../App.css"
//images
const img1 = "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699401600&semt=ais";
const img2 = "https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg";
const img3 = "https://cdn5.vectorstock.com/i/1000x1000/52/04/online-shopping-e-commerce-banner-concept-vector-25035204.jpg";
const img4 = "https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559464.jpg";

const BasicSlider = () => {
  return (
    <>
        <HeroSlider
          slidingAnimation="top_to_bottom"
          orientation="vertical"
          initialSlide={1}
          autoplay
          onBeforeChange={(previousSlide, nextSlide) =>
            console.log("onBeforeChange", previousSlide, nextSlide)
          }
          onChange={(nextSlide) => console.log("onChange", nextSlide)}
          onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
          settings={{
            slidingDuration: 300,
            slidingDelay: -2,
            shouldAutoplay: true,
            shouldDisplayButtons: true,
            autoplayDuration: 1000,
          }}
          className="custom-hero-slider"
        >
          <Slide
  className="w-[92%] 800px:w-full h-[100%] relative"
  style={{ height: "100vh" }}
>
  <div
    className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
    
  >
    <img src={img1} style={{width:'100%'}} alt='squim' />
    </div>

  
</Slide>


<Slide
  className="w-[92%] 800px:w-full h-[100%] relative"
  style={{ height: "100vh" }}
>
  <div
    className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
    
  >
    <img src={img2} alt='squim' style={{width:'100%'}} />
    </div>
  
</Slide>
<Slide
  className="w-[92%] 800px:w-full h-[100%] relative"
  style={{ height: "100vh" }}
>
  <div
    className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
    
  >
    <img src={img3} alt='squim' style={{width:'100%'}} />
    </div>
  
</Slide>
<Slide
  className="w-[92%] 800px:w-full h-[100%] relative"
  style={{ height: "100vh" }}
>
  <div
    className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
    
  >
    <img src={img4} alt='squim' style={{width:'100%'}} />
    </div>
  
</Slide>
          <Nav />
        </HeroSlider>
    </>
  );
};
//default 

export default BasicSlider;
