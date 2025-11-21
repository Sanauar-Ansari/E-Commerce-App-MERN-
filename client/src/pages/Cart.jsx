
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
const Cart = () => {
  const navigate=useNavigate();
  const { cart, updateQty, removeFromCart } = useContext(CartContext);
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

  const totalAmount = cart.reduce((sum, item) => sum + item?.productId?.offerPrice * item.quantity,0);

  console.log(cart,"carttttt")

  // PLACE ORDER FUNCTION
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,{address},{withCredentials: true });
      alert("Order placed successfully!");
      console.log(res)
    } catch (err) {
      console.log(err.response?.data);
      alert("Order failed");
    }
  };

  return (
    <>
   
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* LEFT SIDE — CART ITEMS */}
      <div style={{ width: "65%" }}>
        <h2>Your Cart</h2>

        {cart.length === 0 && <h3>No items in cart</h3>}

        {cart.map((i) => (
          <div key={i?.productId?._id} className="flex justify-between items-center h-25 border p-2 mb-2 rounded-xl ">
            <div className="w-12"><img src={i?.productId?.image}/></div>
            <h5>{i?.productId?.name}</h5>
            <p>Price: ₹{i?.productId?.offerPrice}</p>

            <div style={styles.qtyBox}>
              <button
                onClick={() => updateQty(i.productId?._id, i?.quantity - 1)}
              >
                -
              </button>
              <span>{i.quantity}</span>
              <button
                onClick={() => updateQty(i.productId._id, i.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(i.productId._id)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}

        <h2>{`Total: ₹ ${totalAmount}/-`}</h2>

   <button onClick={()=>navigate("/checkout")} style={styles.orderBtn}>
          Proceed to Buy
        </button>
      </div>

    </div>

    {/* <div className="flex align-center justify-center"><button>Playment</button></div> */}
     </>
  );
};

const styles = {

  qtyBox: { display: "flex", gap: 10, alignItems: "center" },
  removeBtn: {
    background: "red",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
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
  orderBtn: {
    width: "100%",
    background: "green",
    padding: "12px",
    color: "white",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Cart;
