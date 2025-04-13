"use client"

import React, { memo } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/navbar/navbar';

const ViewBlogPage = () => {
  const { id } = useParams(); // Extract the id from the URL

  if (!id) return <div><Navbar/>Loading...</div>;

  const { data: blog, error } = useQuery({
queryKey: ["blogInfo", id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/fetch/${id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to fetch blog");
            toast.error("Failed to fetch blog");
        }
        return data;
      } catch (error) {
        throw new Error((error as Error).message || String(error));
      }
    },
    enabled: !!id,
  });

  const fallbackImage = "https://shorturl.at/6w7NB";

  return (
    <>
      <Toaster />
      <Navbar />
      {error && <div className="text-red-500 text-center">{(error as Error).message}</div>}
      <div className='w-full bg-white pb-10 dark:bg-gray-900'>
        <div className="relative w-[90%] sm:w-[60%] mx-auto bg-white dark:bg-gray-900">
          <div className="relative h-fit-content bg-cover bg-center">
            <div className="break-words whitespace-normal">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">{blog?.title}</h2>
            </div>
            <img 
              src={blog?.image}
              className="w-full h-[24rem] mt-5"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop if fallback fails
                (e.target as HTMLImageElement).src = fallbackImage; // Fallback image URL
              }}
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
  );
};

export default ViewBlogPage;