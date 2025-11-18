
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
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

  const total = cart.reduce(
    (sum, item) => sum + item?.productId?.price * item.quantity,
    0
  );

  console.log(cart,"carttttt")

  // PLACE ORDER FUNCTION
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/order/place-order",
        {
          address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");

      window.location.reload();
    } catch (err) {
      console.log(err.response?.data);
      alert("Order failed");
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* LEFT SIDE — CART ITEMS */}
      <div style={{ width: "65%" }}>
        <h2>Your Cart</h2>

        {cart.length === 0 && <h3>No items in cart</h3>}

        {cart.map((i) => (
          <div key={i?.productId?._id} className="flex justify-between items-center h-25 border p-2 mb-2 rounded-xl ">
            <div className="w-15"><img src={i.productId.image}/></div>
            <h5>{i?.productId?.name}</h5>
            <p>Price: ₹{i?.productId?.price}</p>

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

        <h2>{`Total: ₹ ${total}/-`}</h2>


      </div>



{
  cart.length===0?"":(
    <>
      {/* ADDRESS FORM */}
      <div style={styles.addressBox}>
        <h2>Delivery Address</h2>

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

        <button onClick={placeOrder} style={styles.orderBtn}>
          Place Order
        </button>
      </div>
    </>
  )
}
    </div>
  );
};

const styles = {
  // item: {
  //   border: "1px solid #ddd",
  //   padding: 10,
  //   borderRadius: 6,
  //   marginBottom: 10,
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
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
