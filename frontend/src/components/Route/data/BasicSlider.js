import React from 'react'
import HeroSlider,{Slide,Nav} from 'hero-slider'

//images
const img1="https://i.imgur.com/Gu5Cznz.jpg"
const img2="https://i.imgur.com/idjXzVQ.jpg"
const img3="https://i.imgur.com/8DYumaY.jpg"
const img4="https://i.imgur.com/8IuucQZ.jpg"
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
            backgroundImageSrc:img1,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImageSrc:img2,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImageSrc:img3,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        background={{
            backgroundImageSrc:img4,
            backgroundAttachment:"fixed"
        }}
        />
        <Nav />
    </HeroSlider>
    </>
  )
}

export default BasicSlider
