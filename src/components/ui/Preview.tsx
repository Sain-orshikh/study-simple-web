"use client"

import React from 'react'

interface Blog {
    image: any;
    title: string;
    content: string;
    category: string;
  }

const Preview: React.FC<{blog: Blog}> = ({blog}) => {

  return (
    <>
      <div className='w-full h-full overflow-auto bg-white py-10'>
        <div className="p-2 relative w-[90%] sm:w-[60%] mx-auto bg-white dark:bg-gray-900">
          <div className="relative h-fit-content bg-cover bg-center">
            <div className="break-words whitespace-normal">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">{blog?.title}</h2>
            </div>
            <img 
              src={blog?.image}
              className="w-full h-[24rem] mt-5"
            />
          </div>

          <div className="mt-5 bg">
            <div className='text-black text-lg dark:text-white'>
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
          </div>
        </div>
      </div>
    </>  
)
}

export default Preview