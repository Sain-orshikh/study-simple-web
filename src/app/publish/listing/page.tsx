"use client"

import React from 'react'
import ListingEditor from './Editor'
import Sidebar from "@/components/sidebar/sidebar"

const ListingPage = () => {
  return (
    <>
      <Sidebar>
      <div className='w-full h-full flex flex-row'>
        <div className='w-full h-full bg-white'>
          <ListingEditor />
        </div>
      </div>
      </Sidebar>
    </>
  )
}

export default ListingPage