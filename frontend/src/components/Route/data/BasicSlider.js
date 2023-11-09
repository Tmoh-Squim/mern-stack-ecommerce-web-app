import React from "react";
import HeroSlider, { Slide, Nav } from "hero-slider";
import "../../../App.css"
//images
const img1 = "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699401600&semt=ais";
const img2 = "https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg";
const img3 = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265";
const img4 = "https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559464.jpg";

const BasicSlider = () => {
  return (
    <>
        <HeroSlider
          slidingAnimation="left_to_right"
          orientation="horizontal"
          initialSlide={1}
          autoplay
          onBeforeChange={(previousSlide, nextSlide) =>
            console.log("onBeforeChange", previousSlide, nextSlide)
          }
          onChange={(nextSlide) => console.log("onChange", nextSlide)}
          onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
          settings={{
            slidingDuration: 200,
            slidingDelay: 0,
            shouldAutoplay: true,
            shouldDisplayButtons: true,
            autoplayDuration: 1000,
          }}
          className="custom-hero-slider"
        >
          <Slide
            background={{
              backgroundImageSrc: img1,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full h-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img2,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full h-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img3,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full h-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img4,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full h-[100%]"
            style={{ height: "100vh"}}
          />
          <Nav />
        </HeroSlider>
    </>
  );
};
//default 

export default BasicSlider;
