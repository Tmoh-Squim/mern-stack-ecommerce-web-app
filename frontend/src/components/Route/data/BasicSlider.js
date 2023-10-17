import React from 'react'
import HeroSlider,{Slide} from 'hero-slider'

const BasicSlider = () => {
  return (
    <>
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
    </>
  )
}

export default BasicSlider
