import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllProductReport = () => {
    const [product,setProduct]=useState([]);
  const mainURL="https://e-commerce-app-mern-1.onrender.com";

      useEffect(()=>{
        const fetchProduct=async()=>{
          const res=await axios.get(`${mainURL}/api/product/fetch-product`, {withCredentials: true})
          setProduct(res?.data?.products)
        }
      fetchProduct();
    },[])

    // console.log(product,"jiiiiii")
  return (
    <div className='p-4'>
        <div className='flex justify-between mb-3'>
        <h4>Get All Product Report Here</h4>
         <div class="flex flex-wrap items-center justify-center gap-5 md:gap-12">
          <button type="button" class="px-6 py-2 active:scale-95 transition bg-blue-500 rounded text-white text-sm font-medium">Generate Dox. Report</button>
         </div>
        </div>

        <div>
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-left">
                       <th className="px-4 py-2 border">Image</th>
                       <th className="px-4 py-2 border">Category</th>
                       <th className="px-4 py-2 border">Name</th>
                       <th className="px-4 py-2 border">Description</th>
                       <th className="px-4 py-2 border">Price</th>
                       <th className="px-4 py-2 border">Offer Price</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded"
                />
              </td>

              <td className="px-4 py-2 border">{product.categoty}</td>

              <td className="px-4 py-2 border font-semibold">
                {product.name}
              </td>

              <td className="px-4 py-2 border">
                <span className="line-clamp-2">{product.description}</span>
              </td>

              <td className="px-4 py-2 border text-green-600 font-medium">
                ₹{product.price}
              </td>

              <td className="px-4 py-2 border text-blue-600 font-medium">
                ₹{product.offerPrice}
              </td>
            </tr>
          ))}
                </tbody>
            </table>
        </div>
    
    </div>
  )
}

export default AllProductReport
