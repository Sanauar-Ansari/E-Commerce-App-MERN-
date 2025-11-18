import React from 'react'
import ImageOne from "../assets/mainImage.png";

const Banner = () => {
  return (
      <>
         <div className='pb-3'>
          <img className="w-full h-50" src={ImageOne} alt="banner"/>
         </div>
       </>
  )
}

export default Banner
