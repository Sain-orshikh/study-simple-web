

import React from 'react'
import Editor from './Editor'
import { Navbar } from '@/components/navbar/navbar'

const Edit = () => {
  return (
    <>
      <Navbar />
      <div className='w-full h-full flex flex-row'>
        <div className='w-full h-full bg-white'>
          <Editor />
        </div>
      </div>
    </>
  )
}

export default Edit