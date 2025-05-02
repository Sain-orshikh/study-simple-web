"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from "@/components/sidebar/sidebar"
import { BiSolidHeartSquare, BiDislike } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { format, parseISO } from 'date-fns';

const ViewBlogPage = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [blog, setBlog] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [userLikeState, setUserLikeState] = useState<'liked' | 'disliked' | 'none'>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [likeProcessing, setLikeProcessing] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch blog');
        }
        const blogData = await res.json();
        setBlog(blogData);
        setLikesCount(blogData.likes || 0);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      setLikeProcessing(true);
      const response = await fetch(`/api/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to like blog');
      }
      
      const data = await response.json();
      setLikesCount(data.likes);
      setUserLikeState('liked');
      toast.success('Thanks for your like!');
    } catch (error) {
      console.error('Error liking blog:', error);
      toast.error('Failed to update like status');
    } finally {
      setLikeProcessing(false);
    }
  };

  const handleUnlike = async () => {
    try {
      setLikeProcessing(true);
      const response = await fetch(`/api/blogs/${id}/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to unlike blog');
      }
      
      const data = await response.json();
      setLikesCount(data.likes);
      setUserLikeState('none');
      toast.success('Removed your like');
    } catch (error) {
      console.error('Error unliking blog:', error);
      toast.error('Failed to update like status');
    } finally {
      setLikeProcessing(false);
    }
  };

  const handleDislike = async () => {
    try {
      setLikeProcessing(true);
      const response = await fetch(`/api/blogs/${id}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to dislike blog');
      }
      
      const data = await response.json();
      setLikesCount(data.likes);
      setUserLikeState('disliked');
      toast.success('Noted your dislike');
    } catch (error) {
      console.error('Error disliking blog:', error);
      toast.error('Failed to update like status');
    } finally {
      setLikeProcessing(false);
    }
  };

  const handleShare = () => {
    // Get current URL
    const blogUrl = window.location.href;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'Check out this blog post',
        text: `Check out this article: ${blog?.title}`,
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
        toast.error('Failed to copy link');
      });
  };

  const fallbackImage = "https://shorturl.at/6w7NB";

  if (loading) {
    return (
      <>
        <Sidebar>
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        </Sidebar>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <Sidebar>
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
      <div className='w-full bg-white pb-10 dark:bg-gray-900'>
        <div className="relative w-[90%] sm:w-[60%] mx-auto bg-white dark:bg-gray-900">
          {/* Blog Header */}
          <div className="py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {blog?.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs mr-2">
                    {blog.category}
                  </span>
                )}
                {blog?.createdAt && format(new Date(blog.createdAt), 'MMMM d, yyyy')}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={userLikeState === 'liked' ? handleUnlike : handleLike}
                  className={`flex items-center px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    userLikeState === 'liked' 
                      ? 'text-red-500 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
                  }`}
                  disabled={likeProcessing}
                  aria-label={userLikeState === 'liked' ? "Unlike" : "Like"}
                >
                  <BiSolidHeartSquare className={`mr-1 ${likeProcessing ? 'animate-pulse' : ''}`} size={18} />
                  <span className="text-sm">{likesCount}</span>
                </button>
                
                <button
                  onClick={handleDislike}
                  className={`flex items-center px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    userLikeState === 'disliked' 
                      ? 'text-blue-500 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                  disabled={likeProcessing}
                  aria-label={userLikeState === 'disliked' ? "Remove dislike" : "Dislike"}
                >
                  <BiDislike className={`${likeProcessing ? 'animate-pulse' : ''}`} size={18} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <BsShare size={16} />
                </button>
              </div>
            </div>
            
            <div className="break-words whitespace-normal">
              <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">{blog?.title}</h1>
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 dark:text-gray-300 mr-2">
                  {blog?.author?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{blog?.author || 'Anonymous'}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-auto max-h-[24rem] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </div>

          {/* Blog Content */}
          <div className="mt-8 bg">
            <div className='text-black text-lg dark:text-white prose max-w-none dark:prose-invert'>
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
          </div>
        </div>
      </div>
      </Sidebar>
    </>
  );
};

export default ViewBlogPage;