import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); //  Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true); //  Start loading
    // You can add your login logic here
     try {
      const res = await axios.post(
        `http://localhost:3000/api/user/signin`,
        formData,
      { withCredentials: true }
      );
     console.log(res,"res.data in login")
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
        window.location.reload();
        navigate("/");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); //  Stop loading after response
    }
  
  };
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          {
            loading?((<span>Login...</span>)):("Login")
          }
        </button>
        <div className="text-center mt-4">
          <Link to="/signup" >Don't have account? <span className="text-blue-600">Register</span> </Link>  
        </div>
        </form>

        {/* <div className="pt-5">
          <p>For Login Use Following Creadentials.</p>
          <p>Email: meatech@gmail.com</p>
          <p>Password: meatech123</p>
        </div> */}
    </div>
  )
}

export default Login
