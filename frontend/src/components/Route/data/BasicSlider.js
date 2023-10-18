import React from "react";
import HeroSlider, { Slide, Nav } from "hero-slider";

//images
const img1 = "https://i.imgur.com/Gu5Cznz.jpg";
const img2 = "https://i.imgur.com/idjXzVQ.jpg";
const img3 = "https://i.imgur.com/8DYumaY.jpg";
const img4 = "https://i.imgur.com/8IuucQZ.jpg";
const BasicSlider = () => {
  return (
    <>
      <div className="min-h-[10vh] 800px:h-[50vh]">
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
          className="relative bg-black w-full h-[25vh] 800px:h[35vh]"
          settings={{
            slidingDuration: 200,
            slidingDelay: 0,
            shouldAutoplay: true,
            shouldDisplayButtons: true,
            autoplayDuration: 1000,
          }}
          style={{ height: "35vh",
          backgroundColor: "black" }}
        >
          <Slide
            background={{
              backgroundImageSrc: img1,
              backgroundAttachment: "fixed",
            }}
            style={{ height: "35vh" }}
          />
          <Slide
            background={{
              backgroundImageSrc: img2,
              backgroundAttachment: "fixed",
            }}
            style={{ height: "35vh" }}
          />
          <Slide
            background={{
              backgroundImageSrc: img3,
              backgroundAttachment: "fixed",
            }}
            style={{ height: "35vh" }}
          />
          <Slide
            background={{
              backgroundImageSrc: img4,
              backgroundAttachment: "fixed",
            }}
            style={{ height: "35vh" }}
          />
          <Nav />
        </HeroSlider>
      </div>
    </>
  );
};

export default BasicSlider;
