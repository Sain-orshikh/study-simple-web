

import React from 'react'
import Editor from './Editor'
import Sidebar from "@/components/sidebar/sidebar"

const Edit = () => {
  return (
    <>
      <Sidebar>
      <div className='w-full h-full flex flex-row'>
        <div className='w-full h-full bg-white'>
          <Editor />
        </div>
      </div>
      </Sidebar>
    </>
  )
}

export default Edit