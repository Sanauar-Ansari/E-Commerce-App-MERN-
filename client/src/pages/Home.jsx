import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Banner from '../components/Banner'
import axios from "axios";
import { CartContext } from '../context/CartContext';
import image from "../assets/mainImage.png"

const Home = () => {

        const token = localStorage.getItem("token");
        const [product,setProduct]=useState([]);
         const { addToCart } = useContext(CartContext);

      useEffect(()=>{

        const fetchProduct=async()=>{
          const res=await axios.get("http://localhost:3000/api/product/fetch-product",{
              headers: { Authorization: `Bearer ${token}` }
          });
          setProduct(res?.data?.products)
        }
      fetchProduct();
    },[])
  return (
    <>
    <Banner/>
    {/* {console.log(product)} */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {product.map((p,index) => (
    <div
      // key={p._id}
      key={index}
      className="w-70 border border-gray-200 rounded-xl p-3 cursor-pointer  transition-transform duration-200 transform hover:scale-101 hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full h-40 sm:h-44 md:h-48 lg:h-52 flex items-center justify-center">
        <img src={p.image} alt="image" className="h-full w-full object-contain rounded-md"/>
      </div>
      {/* Category */}
      <p className="text-gray-700 text-xs sm:text-sm mt-2">{p.categoty}</p>
      {/* Title */}
      <h3 className="text-gray-800 text-sm sm:text-base mt-1">{p.name}</h3>
      {/* Ratings */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-green-600 text-base sm:text-lg">★★★★★</span>
        <span className="text-gray-500 text-xs sm:text-sm">(4)</span>
      </div>

      {/* Price Row */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-green-600 font-bold text-lg sm:text-xl">₹{p.offerPrice}</span>
          <span className="text-gray-400 line-through text-xs sm:text-sm">₹{p.price}</span>
        </div>

        {/* Add Button */}
        <button
          onClick={() => addToCart(p)}type="button"  className="bg-blue-600 text-white px-5 py-1 hover:bg-blue-900"
        >
          Add
        </button>
      </div>
    </div>
  ))}
</div>


     </>
  )
}


export default Home
