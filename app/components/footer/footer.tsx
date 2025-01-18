import React from 'react'
import homeModule from './footer.module.css';

const Footer = () => {
  return (
    <div className={`${homeModule.footerSection} flex justify-between relative flex-wrap content-center`}>
        <p className='lg:pl-10 ml-8'>
          © 2024 All rights reserved
        </p>

        <p className='lg:pr-10'>
          Alier E. Torrenueva
        </p>
    </div>
  )
}

export default Footer