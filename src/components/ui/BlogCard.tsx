"use client"

import React from 'react'
import Link from 'next/link';
import { BiSolidHeartSquare } from "react-icons/bi";

interface Blog {
  _id: string;
  image: string;
  title: string;
  content: string;
  category: string;
}

const BlogCard: React.FC<{ blog: Blog, isPreview: boolean }> = ({ blog, isPreview }) => {

  const fallbackImage = "https://shorturl.at/6w7NB";
    const handleEditOpen = () => {
        console.log("Edit button clicked for blog:", blog._id);
    };
  return (
    <>
      <div className="w-[22rem] sm:w-[18rem] min-h-[14rem] rounded-sm border border-gray-500 transition-transform transform hover:-translate-y-1.5">
            <button className="w-full h-[12rem] border-b border-gray-500">
              {!isPreview && (<Link href={`/viewblog/${blog._id}`}>
              <div className="w-full h-[12rem] border-b border-gray-500">
                <img
                  src={blog.image}
                  alt="Blog image"
                  className='w-full h-full object-cover rounded-t-sm'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop if fallback fails
                    target.src = fallbackImage; // Fallback image URL
                  }}
                />
              </div>
              </Link>)}
              {isPreview && (
                <div className="w-full h-[12rem] border-b border-gray-500">
                <img
                  src={blog.image}
                  alt="Blog image"
                  className='w-full h-full object-cover rounded-t-sm'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop if fallback fails
                    target.src = fallbackImage; // Fallback image URL
                  }}
                />
              </div>
              )}
            </button>
          <div className="flex flex-row">
            <div><button onClick={handleEditOpen} className="ml-2 text-purple-500"><BiSolidHeartSquare fontSize={25}/></button></div>  
            <div><h6 className="mx-1 mb-1 text-lg text-black">{blog.title}</h6></div>
          </div>
        </div>
    </>
  )
}

export default BlogCard