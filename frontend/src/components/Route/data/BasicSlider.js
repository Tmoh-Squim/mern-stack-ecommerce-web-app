import React from "react";
import HeroSlider, { Slide, Nav } from "hero-slider";
import "../../../App.css"
//images
const img1 = "https://i.imgur.com/Gu5Cznz.jpg";
const img2 = "https://i.imgur.com/idjXzVQ.jpg";
const img3 = "https://i.imgur.com/8DYumaY.jpg";
const img4 = "https://i.imgur.com/8IuucQZ.jpg";

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
            className="w-[92%] 800px:w-full"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img2,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img3,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img4,
              backgroundAttachment: "fixed",
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full"
            style={{ height: "100vh"}}
          />
          <Nav />
        </HeroSlider>
    </>
  );
};
//default 

export default BasicSlider;
