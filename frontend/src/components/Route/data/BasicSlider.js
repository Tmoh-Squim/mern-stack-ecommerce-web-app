import React from 'react'
import HeroSlider,{Slide} from 'hero-slider'

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
        Background={{
            backgroundImage:img1,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        Background={{
            backgroundImage:img2,
            backgroundAttachment:"fixed"
        }}
        />
        <Slide 
        Background={{
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
