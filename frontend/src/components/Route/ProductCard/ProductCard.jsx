import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data,isEvent,isOwner }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
console.log('isOwner',isOwner)
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-[50%] h-[auto] mb-[0.16rem] 800px:mb-[2px] bg-white gap-x-[3px] 800px:rounded-[5px] p-[2.5px] pb-1 800px:p-0 shadow-sm  relative cursor-pointer sm:w-full">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` :(isOwner ? `/update-product/${data._id}` : `/product/${data._id}`)}`}>
          <img
            src={`${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[55%] m-0 rounded-t-[4px] 800px:rounded-t-none object-cover 800px:object-contain"
          />
        </Link>
        <div className="px-[3px] 800px:px-0">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-[1.5px] font-[500]">
            {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
          </h4>
          <div className="py-[1.5px] items-start">
            <div className="flex items-start">
              <h5 className={`${styles.productDiscountPrice}`}>
               Ksh {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                Ksh {data.originalPrice ? data.originalPrice  : null}
              </h4>
            </div>
            <div className="flex space-x-0">
          <Ratings rating={data?.ratings} />
          <span className="font-[400] text-[13px] m-0 text-[#68d284] 800px:hidden">
              ({data?.sold_out})
            </span>
          </div>
          <span className="hidden font-[400] text-[13px] text-[#68d284] 800px:block">
              {data?.sold_out} sold
            </span>
            </div>
        </Link>
        </div>

        {/* side options */}
        <div className="hidden 800px:block">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
