import mongoose from "mongoose";

const url =
  "mongodb+srv://sanauaransari99:LyNvwxdz2qhDazrP@cluster0.alykwsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  // razorpay details
  // test API key= rzp_test_RhuhcDCND55vs5
  // key secret- ZD4e2WLNEXMwOqkuUo58pwen