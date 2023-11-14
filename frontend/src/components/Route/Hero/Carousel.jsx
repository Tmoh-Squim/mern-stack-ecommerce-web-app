import React,{Component} from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../../../App.css'

const img1 =
  "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699401600&semt=ais";
const img2 =
  "https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg";
const img3 =
  "https://cdn5.vectorstock.com/i/1000x1000/52/04/online-shopping-e-commerce-banner-concept-vector-25035204.jpg";
const img4 =
  "https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559464.jpg";
class Carousele extends Component {
    constructor(props){
        super(props);

        this.onChange=this.onChange.bind(this);
        this.onClickItem=this.onClickItem.bind(this);
        this.onClickThumb=this.onClickThumb.bind(this);
    }
    onChange=(index)=>{
        console.log(`slide changed to ${index}`)
    };
    onClickItem=(index)=>{
        console.log(`item clicked : ${index}`)
        
    }
    onClickThumb=(index)=>{
        console.log(`Thumb clicked:${index}`)
        
    }
    render(){
  return (
      <Carousel
        showArrows={true}
        onChange={this.onChange}
        onClickItem={this.onClickItem}
        onClickThumb={this.onClickThumb}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        className="h-[135px] w-[94%] rounded-[9px] m-4 800px:h-[400px] 800px:w-[65%]"
      >
        <div>
          <img src={img1} className="h-[135px] w-[100%] rounded-[9px] m-2 !mt-0 800px:h-[390px] 800px:w-[50%]" alt="" />
        </div>
        <div>
          <img src={img2} className="h-[135px] w-[100%] rounded-[9px] m-2 !mt-0 800px:h-[390px] 800px:w-[50%]" alt="" />
        </div>
        <div>
          <img src={img3} className="h-[135px] w-[100%] rounded-[9px] m-2 !mt-0 800px:h-[390px] 800px:w-[50%]" alt="" />
        </div>
        <div>
          <img src={img4} className="h-[135px] w-[100%] rounded-[9px] m-2 !mt-0 800px:h-[390px] 800px:w-[50%]" alt="" />
        </div>
      </Carousel>
  );
};
}

export default Carousele;
