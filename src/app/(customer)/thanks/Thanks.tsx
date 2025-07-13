
import { NextPage } from 'next'
import React from 'react'


const ThanksPage: NextPage = () => {
  return (
   
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold mb-4'>Thank You!</h1>
          <p className='text-lg'>Your order has been placed successfully.</p>
          <p className='text-lg'>We appreciate your business!</p>
        </div>
  
  )
}

export default ThanksPage