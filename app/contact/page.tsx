import Image from 'next/image'
import React from 'react'
import GetAllContactModule from './contact.module.css';

const Contact = () => {
  return (
    <main>
        <div className={GetAllContactModule.backgroundImgContact}>
            <div className={GetAllContactModule.placeholder1}>
              <h1 className={GetAllContactModule.headerHome}>CONTACT</h1>
            </div>
        </div>
        <div className={GetAllContactModule.mobileContainer}>
          <div className='flex flex-col items-center lg:p-20 p-7'>
              <Image 
              src='/mail.svg'
              alt='Email Logo'
              width={65} 
              height={65}
              />
              <p className='font-bold mb-7 mt-2'>Ideas? Email me now!</p>
              <p className='text-center tracking-wide mb-7'>Have a new project idea? Feel free to share the details with me!</p>
              <p>tetsu.kala@gmail.com</p>
          </div>

          <div className={`bg-gray-100 flex flex-col items-center lg:p-20 p-7`}>
            <Image       
              src='/iphone.svg'
              alt='Iphone Logo'
              width={65} 
              height={65} />
              <p className='font-bold mb-7 mt-2'>Call Me</p>
              <p className='text-center tracking-wide mb-7'>Give me a call to kick-start your design project—or even just to grab a coffee!</p>
              <p>+639491713389 </p>
              <p> +639670783267</p>
          </div>

          <div className='flex flex-col items-center lg:p-20 p-7'>
          <Image       
              src='/location.svg'
              alt='Location Logo'
              width={65} 
              height={65} />
              <p className='font-bold mb-7 mt-2'>Location</p>
              <p className='text-center tracking-wide mb-7'>8W98+VRF, Holy Name, Cebu City, 6000 Cebu</p>
          </div>
        </div>
    </main>
  )
}

export default Contact