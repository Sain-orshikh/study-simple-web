"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { BiSolidHeartSquare, BiCommentDetail, BiDislike } from "react-icons/bi";
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
  comments?: any[];
}

const BlogCard: React.FC<{ blog: Blog, isPreview: boolean }> = ({ blog, isPreview }) => {
  const [localLikes, setLocalLikes] = useState(blog.likes || 0);
  const [commentCount, setCommentCount] = useState(blog.comments?.length || 0);
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
      
      // Toggle like in local state
      const result = doToggleLike(blog._id);
      
      // If already liked, decrement the like count (unlike)
      if (result === 'unliked') {
        // Call the API to decrement the like
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
      } 
      // If not already liked, increment the like count
      else if (result === 'liked') {
        // If was disliked, we need to update backend dislike count too
        if (isDisliked) {
          // No need to call dislike API here since we handle it in the like API
        }
        
        // Call the API to add/increment the like
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
      
      // Toggle dislike in local state
      const result = doToggleDislike(blog._id);
      
      // If disliked and was previously liked, we need to decrement the like count
      if (result === 'disliked' && isLiked) {
        // Call API to handle the dislike (which should also handle removing the like)
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
      } 
      // If undisliked, no change to like count needed
      else if (result === 'undisliked') {
        // No API call needed here as we don't track dislikes count in backend
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleShare = () => {
    // Create blog URL with ID
    const blogUrl = `${window.location.origin}/viewblog/${blog._id}`;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this article: ${blog.title}`,
        url: blogUrl,
      })
      .catch((error) => {
        console.log('Error sharing', error);
        // Fallback: copy to clipboard
        copyToClipboard(blogUrl);
      });
    } else {
      // Fallback: copy to clipboard
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
  
  // Format date if available
  const formattedDate = (() => {
    try {
      if (!blog.createdAt) return 'Recently published';
      // Try to parse the date - handle both ISO string format and other formats
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
      {/* Image Container */}
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
            {/* Category badge */}
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
            {/* Category badge for preview */}
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {blog.category || 'Uncategorized'}
            </span>
          </>
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Author & Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{blog.author || 'Anonymous'}</span>
          <span>{formattedDate}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
          {!isPreview ? (
            <Link href={`/viewblog/${blog._id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {blog.title}
            </Link>
          ) : (
            blog.title
          )}
        </h3>
        
        {/* Interactive Buttons */}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
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
          
          <Link href={`/viewblog/${blog._id}#comments`} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <BiCommentDetail className="mr-1" size={18} />
            <span className="text-xs">{commentCount}</span>
          </Link>
          
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