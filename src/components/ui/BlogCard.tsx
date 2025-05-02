"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import { BiSolidHeartSquare, BiDislike } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { format, parseISO } from 'date-fns';
import { useAtom } from 'jotai';
import { blogInteractions, toggleBlogLike, toggleBlogDislike, isBlogLiked, isBlogDisliked } from '@/components/themeatom';
import toast from 'react-hot-toast';

interface Blog {
  _id: string;
  image: string;
  title: string;
  content: string;
  category: string;
  author?: string;
  createdAt?: string;
  likes?: number;
}

const BlogCard: React.FC<{ blog: Blog, isPreview: boolean }> = ({ blog, isPreview }) => {
  const [localLikes, setLocalLikes] = useState(blog.likes || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get blog interaction state from global state
  const [interactions] = useAtom(blogInteractions);
  const [, doToggleLike] = useAtom(toggleBlogLike);
  const [, doToggleDislike] = useAtom(toggleBlogDislike);
  const [getLiked] = useAtom(isBlogLiked);
  const [getDisliked] = useAtom(isBlogDisliked);
  
  const isLiked = getLiked(blog._id);
  const isDisliked = getDisliked(blog._id);
  
  const fallbackImage = "https://shorturl.at/6w7NB";
  
  const handleLike = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      const result = doToggleLike(blog._id);
      
      if (result === 'unliked') {
        const response = await fetch(`/api/blogs/${blog._id}/unlike`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
        }
      } else if (result === 'liked') {
        if (isDisliked) {
        }
        
        const response = await fetch(`/api/blogs/${blog._id}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDislike = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      const result = doToggleDislike(blog._id);
      
      if (result === 'disliked' && isLiked) {
        const response = await fetch(`/api/blogs/${blog._id}/dislike`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
        }
      } else if (result === 'undisliked') {
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };
  
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
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{blog.author || 'Anonymous'}</span>
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
          {!isPreview ? (
            <Link href={`/viewblog/${blog._id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {blog.title}
            </Link>
          ) : (
            blog.title
          )}
        </h3>
        
        <div className="mt-auto flex items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          {/* Group for like and dislike buttons */}
          <div className="flex items-center space-x-3 flex-grow">
            <button 
              onClick={handleLike} 
              className={`flex items-center ${
                isLiked 
                  ? 'text-red-500 dark:text-red-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
              } transition-colors`}
              disabled={isProcessing}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <BiSolidHeartSquare className={`mr-1 ${isProcessing ? 'animate-pulse' : ''}`} size={18} />
              <span className="text-xs">{localLikes}</span>
            </button>
            
            <button 
              onClick={handleDislike} 
              className={`flex items-center ${
                isDisliked 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              } transition-colors`}
              disabled={isProcessing}
              aria-label={isDisliked ? "Remove dislike" : "Dislike"}
            >
              <BiDislike className={`${isProcessing ? 'animate-pulse' : ''}`} size={18} />
            </button>
          </div>
          
          {/* Share button pushed to the right */}
          <button 
            onClick={handleShare} 
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            aria-label="Share blog"
          >
            <BsShare size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard