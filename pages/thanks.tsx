import Layout from '@/app/components/ui/layout/Layout'
import Meta from '@/app/components/ui/Meta'
import { NextPage } from 'next'
import React from 'react'

type Props = {}

const ThanksPage: NextPage = () => {
  return (
    <Meta title='Thanks'>
      <Layout>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold mb-4'>Thank You!</h1>
          <p className='text-lg'>Your order has been placed successfully.</p>
          <p className='text-lg'>We appreciate your business!</p>
        </div>
      </Layout>

    </Meta>
  )
}

export default ThanksPage