import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderedReportForUser = () => {
      const [product,setProduct]=useState([]);

      useEffect(()=>{
        const fetchProduct=async()=>{
          const res=await axios.get("http://localhost:3000/api/report/get-all-placed-order-report", {withCredentials: true})
        //   console.log(res,"poooo")
          setProduct(res?.data?.product)
        }
      fetchProduct();
    },[])

    console.log(product,"ppppppp")
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-3 py-2 border">Order ID</th>
            <th className="px-3 py-2 border">Image</th>
            <th className="px-3 py-2 border">Product Name</th>
            <th className="px-3 py-2 border">Price</th>
            <th className="px-3 py-2 border">Qty</th>
            <th className="px-3 py-2 border">Total Amount</th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {product?.map((order) =>
            order.items?.map((item, index) => {
              const p = item.productId;
              return (
                <tr key={item._id} className="hover:bg-gray-50">

                  {/* Order ID only in first row of items */}
                  <td className="px-3 py-2 border font-medium">
                    {index === 0 ? order._id : ""}
                  </td>

                  <td className="px-3 py-2 border">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="px-3 py-2 border">
                    {p.name}
                  </td>

                  <td className="px-3 py-2 border">₹{p.offerPrice}</td>

                  <td className="px-3 py-2 border">{item.quantity}</td>

                  {/* Show total only on first product row */}
                  <td className="px-3 py-2 border font-semibold text-blue-600">
                    {index === 0 ? `₹${order.totalAmount}` : ""}
                  </td>

                  <td className="px-3 py-2 border">{order.status}</td>

                  <td className="px-3 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderedReportForUser
