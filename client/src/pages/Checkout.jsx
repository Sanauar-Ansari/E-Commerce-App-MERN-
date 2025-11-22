import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate=useNavigate();
    // Address state
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    houseNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item?.productId?.offerPrice * item.quantity,
    0
  );

  // 1) Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 2) Handle payment
  const handlePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) return alert("Razorpay failed to load");
    try {
      // Create order in backend
      const  data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {address},
        { withCredentials: true }
      );
      console.log(data,"response amount")
      const options = {
        key:"rzp_test_RhuhcDCND55vs5",
        amount: data?.data?.amount*100,
        currency: "INR",
        name: "E-Commerce Store",
        description: "Payment for Order",
        order_id: data?.data?.orderId,

        handler: async function (response) {
            console.log(response,"Razorpay response in handler")
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
            response,
            { withCredentials: true }
          );
            console.log(verifyRes,"verifyRes responce after varification.")

          if (verifyRes?.data?.success) {
            window.location.href = "/payment-success";
          } else {
            alert("Payment failed to verify");
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.mobile,
        },
      };

      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    } catch (error) {
      console.log(error);
      alert("Payment error");
    }
  };

  return (
    <>
  
    <div  className="flex align-center justify-end">
      <div style={{width:"65%"}}>
     <h3>Order Summary</h3>
      {cart.map((i) => (
        <div key={i.productId._id} style={{ marginBottom: "10px" }}>
          {i.productId.name} × {i.quantity} — ₹{i.productId.price}
        </div>
      ))}

      <h3>Total Amount: ₹{totalAmount}</h3>
    </div>
 

 <div>
    <h3>Shipping Address</h3>
      {
          cart.length===0?"":(
            <>
                {/* ADDRESS FORM */}
      <div style={styles.addressBox}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={address.mobile}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <input
          name="houseNo"
          placeholder="House No"
          value={address.houseNo}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <input
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleAddressChange}
          style={styles.input}
        />

        <button onClick={handlePayment} style={styles.orderBtn}>
          Place Order
        </button>
      </div>     
            </>
          )
      }
 </div>
    </div>
      </>
  );
};


const styles={
      addressBox: {
    width: "35%",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: 10,
    height: "fit-content",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  orderBtn:{
    width:"100%",
    background:"green",
    padding:"15px",
    borderRadius:"10px",
    border:"none",
    color:"white",
    fontSize:"20px"
  }

}
export default Checkout;
