import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} p-4.2 800px:p-6 800px:bg-white rounded-lg mb-2 800px:mb-12`}
        id="categories"
      >
        <div className=" flex justify-evenly mt-2 800px:mt-0 flex-wrap 800px:grid grid-cols-1 gap-x-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-[18%] 800px:w-full h-[100px] 800px:flex items-center justify-evenly cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <img
                    src={i.image_Url}
                    className="w-[35px] h-[35px] 800px:h-auto 800px:w-[120px] object-cover"
                    alt=""
                  />
                  <h4 className={`text-[11px] 800px:text-[18px] leading-[1.2]`}>{i.title}</h4>
                  
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
