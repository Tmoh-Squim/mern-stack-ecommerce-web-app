import React from 'react'
import HeroSlider,{Slide} from 'hero-slider'

//images
const img1="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg"
const img2="https://cdn.openpr.com/T/c/Tc15444071_g.jpg"
const img3="https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png"
const img4="https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png"
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
            backgroundImage:img1,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:img2,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:img3,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImage:img4,
            backgroundAttachment:"fixed"
        }}
        />
    </HeroSlider>
    </>
  )
}

export default BasicSlider
