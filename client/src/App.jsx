
import './App.css'

import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Banner from './components/Banner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from '../ProtectedRoute';
import Cart from './pages/Cart';
import ProductCard from './components/ProductCard';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import AllProductReport from './pages/AllProductReport';
import OrderedReportForUser from './pages/OrderedReportForUser';
import OrederdReportForAllUser from './pages/OrederdReportForAllUser';
function App() {
  const token = localStorage.getItem("token");

  return (
    <>
    <BrowserRouter>
      {token ?   <Navbar /> : null}
    <Routes>
      {
        !token && (
            <>
              <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/login"/>} /> 
            </>
        )
      }
      <Route element={<ProtectedRoute/>}>
        <Route path='/login' element={<Navigate to="/" />}/>
        <Route path='/signup' element={<Navigate to="/" />}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductCard/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/report-all-product" element={<AllProductReport />} />
        <Route path="/report-ordered-user" element={<OrderedReportForUser />} />
        <Route path="/report-ordered-all" element={<OrederdReportForAllUser />} />
         <Route path="/payment-success" element={<PaymentSuccess />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
