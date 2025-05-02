"use client"

import React from 'react'
import Link from 'next/link';
import { BsShare, BsCalendarEvent } from "react-icons/bs";
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

interface Blog {
  _id: string;
  image: string;
  title: string;
  content: string;
  category: string;
  author?: string;
  createdAt?: string;
}

const BlogCard: React.FC<{ blog: Blog, isPreview: boolean }> = ({ blog, isPreview }) => {
  const fallbackImage = "https://shorturl.at/6w7NB";
  
  const handleShare = () => {
    const blogUrl = `${window.location.origin}/viewblog/${blog._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this article: ${blog.title}`,
        url: blogUrl,
      })
      .catch((error) => {
        console.log('Error sharing', error);
        copyToClipboard(blogUrl);
      });
    } else {
      copyToClipboard(blogUrl);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const formattedDate = (() => {
    try {
      if (!blog.createdAt) return 'Recently published';
      const date = typeof blog.createdAt === 'string' 
        ? (blog.createdAt.includes('T') ? parseISO(blog.createdAt) : new Date(blog.createdAt))
        : new Date();
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error("Date formatting error:", error);
      return 'Recently published';
    }
  })();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {!isPreview ? (
          <Link href={`/viewblog/${blog._id}`}>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = fallbackImage;
              }}
            />
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {blog.category || 'Uncategorized'}
            </span>
          </Link>
        ) : (
          <>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = fallbackImage;
              }}
            />
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {blog.category || 'Uncategorized'}
            </span>
          </>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2">
          {!isPreview ? (
            <Link href={`/viewblog/${blog._id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {blog.title}
            </Link>
          ) : (
            blog.title
          )}
        </h3>
        
        {/* Date and share button in same row - removed author section */}
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <BsCalendarEvent className="mr-1" size={14} />
            <span>{formattedDate}</span>
          </div>
          
          <button 
            onClick={handleShare} 
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Share blog"
          >
            <BsShare size={16} className="mr-1" />
            <span className="text-xs">Share</span>
          </button>
        </div>
        
        {/* Removed the separate div with border-t for the share button */}
      </div>
    </div>
  )
}

export default BlogCard