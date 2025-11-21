import React from 'react'
import image from "../assets/mainImage.png"
const ProductCard = ({product}) => {


  return (
   <div className="w-60 bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-full h-36 flex items-center justify-center">
        <img
          src={image}
          alt="Quinoa"
          className="h-full object-contain"
        />
      </div>

      {/* Category */}
      <p className="text-gray-500 text-sm mt-2">Sports</p>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 leading-tight">
        Organic Quinoa 5...
      </h3>

      {/* Ratings */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-green-600 text-lg">★★★★★</span>
        <span className="text-gray-500 text-sm">(4)</span>
      </div>

      {/* Price Row */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="text-green-600 font-bold text-xl">₹420</span>{" "}
          <span className="text-gray-400 line-through">₹450</span>
        </div>

        {/* Add Button */}
        <button className="flex items-center gap-1 border border-green-500 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50 transition">
          {/* <ShoppingCart size={16} /> */}
          Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard
