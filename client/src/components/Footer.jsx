import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex items-start justify-between h-[250px] mt-4 p-5  bg-[#252929] text-white'>
        {/* Left */}
        <div className='flex flex-col' >
              <h5 className='flex items-start justify-start'>Reports</h5>
              <div className='flex items-start justify-start'>
                <ul className='cursor-pointer flex flex-col'>
                <Link to='/report-all-product' className='text-white'>All Product Reports </Link>
                <Link to='/report-ordered-user' className='text-white'>Placed Order Report For Loged-In User</Link>
                <Link to='/report-ordered-all' className='text-white'>Placed Order Report For All Users</Link>
            </ul>
              </div>
         
        </div>
        {/* center */}
          <div className='flex flex-col items-center justify-start' >
              <h5>Connect with Us</h5>
            <ul className='cursor-pointer'>
                <li>Facebook</li>
                <li>Twitter </li>
                <li>Instagram</li>
                <li>Telegram</li>
            </ul>
        </div>

        {/* right */}
        <div className='flex flex-col items-center' >
            <h5>Let Us Help You</h5>
            <ul className='cursor-pointer'>
                <li>Your Account</li>
                <li>Return Policy </li>
                <li>100% Purchase Protection</li>
                <li>Amazon App Download</li>
                <li>Help</li>

            </ul>
        </div>
      
    </div>
  )
}

export default Footer
