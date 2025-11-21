import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
  //  <div style={{ padding: 40, textAlign: "center" }}>
     <div className='flex flex-col items-center justigy-center py-50'>
    <h1 style={{ color: "green" }}>Payment Successful</h1>
    <p>Your order has been placed.</p>
    <Link to="/">Continue Shoping</Link>
  </div>
  )
}

export default PaymentSuccess
