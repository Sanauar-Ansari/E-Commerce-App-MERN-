import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
      const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:3000/api/user/signup", formData, { withCredentials: true })
      console.log(res,"response")
      if(res?.status==201){
        alert(res?.data?.message);
        setFormData({ name: "", email: "", password: "" })
        navigate("/login")
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error,"Error while creating new users at signup page.");
    }
  }


  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
            {
                loading ?(<span>Registering...</span>):("Signup")
            }
          {/* Sign Up */}
        </button>
          <div className="text-center mt-4">
          <Link to="/login" >Already have acoount? <span className="text-blue-600">Login</span> </Link>  
        </div>
      </form>
    </div>
  )
}

export default Signup
