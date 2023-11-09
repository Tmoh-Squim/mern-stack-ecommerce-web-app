import React from "react";
import HeroSlider, { Slide, Nav } from "hero-slider";
import "../../../App.css"
//images
const img1 = "https://images.app.goo.gl/tXa6b5N1iNTV4ST47";
const img2 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.postermywall.com%2Findex.php%2Fart%2Ftemplate%2F67720435bb809be27f46dfb1dd44c6fa%2Fgrocery-sale-retail-or-e-commerce-banner-ad-design-template&psig=AOvVaw1s7nQbcnTEBHnXTOUShC5h&ust=1699622247413000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCP6siAt4IDFQAAAAAdAAAAABAI";
const img3 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpsd%2Fe-commerce-banner&psig=AOvVaw1s7nQbcnTEBHnXTOUShC5h&ust=1699622247413000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCP6siAt4IDFQAAAAAdAAAAABAQ";
const img4 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpsd%2Fe-commerce-banner&psig=AOvVaw2Njng2mh8JKZDUM826Evw9&ust=1699622452264000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODY9JyBt4IDFQAAAAAdAAAAABAE";

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
              backgroundSize:'contain',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full height-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img2,
              backgroundAttachment: "fixed",
              backgroundSize:'contain',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full height-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img3,
              backgroundAttachment: "fixed",
              backgroundSize:'contain',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full height-[100%]"
            style={{ height: "100vh"}}
          />
          <Slide
            background={{
              backgroundImageSrc: img4,
              backgroundAttachment: "fixed",
              backgroundSize:'contain',
              backgroundRepeat:'no-repeat'
            }}
            className="w-[92%] 800px:w-full height-[100%]"
            style={{ height: "100vh"}}
          />
          <Nav />
        </HeroSlider>
    </>
  );
};
//default 

export default BasicSlider;
