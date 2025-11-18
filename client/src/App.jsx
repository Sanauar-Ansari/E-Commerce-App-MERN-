
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

      </Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
