import React,{useState} from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    if(term !== ''){
      setSearchTerm(term);
      const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
    }else{
      setSearchTerm(null)
      setSearchData([]);
    }
  };
  return (
    <div>
       <div
        className={`
      w-full h-[60px] fixed bg-white z-10 top-0 left-0 right-0 shadow-sm 800px:hidden`}
      >
        <input
          type="search"
          placeholder="Search Product..."
          className="h-[40px] w-[96%] m-2 px-2 border-[#e02d2d] border-[2px] rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchData && (
                  <div className="absolute bg-[#fff] overflow-y-scroll z-10 shadow w-[100%] p-4">
                    {searchData.map((i) => {

                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="flex items-center">
                            <img
                              src={`${i.images[0]}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
        </div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage