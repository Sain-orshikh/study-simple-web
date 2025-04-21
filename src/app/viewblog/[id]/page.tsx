"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BiSolidHeartSquare, BiCommentDetail, BiSend, BiDislike } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { format, parseISO } from 'date-fns';
import { useAtom } from 'jotai';
import { 
  blogInteractions, 
  toggleBlogLike, 
  toggleBlogDislike,
  isBlogLiked,
  isBlogDisliked
} from '@/components/themeatom';

interface Comment {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
}

const ViewBlogPage = () => {
  const { id } = useParams(); // Extract the id from the URL
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get blog interaction state from global state
  const [, doToggleLike] = useAtom(toggleBlogLike);
  const [, doToggleDislike] = useAtom(toggleBlogDislike);
  const [getLiked] = useAtom(isBlogLiked);
  const [getDisliked] = useAtom(isBlogDisliked);
  
  const isLiked = id ? getLiked(id as string) : false;
  const isDisliked = id ? getDisliked(id as string) : false;

  if (!id) return <div><Navbar/>Loading...</div>;

  const { data: blog, error, isLoading } = useQuery({
    queryKey: ["blogInfo", id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/fetch/${id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to fetch blog");
        }
        return data;
      } catch (error) {
        throw new Error((error as Error).message || String(error));
      }
    },
    enabled: !!id,
  });

  // Set likes when blog data is loaded
  useEffect(() => {
    if (blog) {
      setLocalLikes(blog.likes || 0);
    }
  }, [blog]);

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["blogComments", id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/comments/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch comments");
        }
        return data.comments || [];
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    enabled: !!id,
  });

  const handleLike = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      // Toggle like in local state
      const result = doToggleLike(id as string);
      
      // If already liked, decrement the like count (unlike)
      if (result === 'unliked') {
        // Call the API to decrement the like
        const response = await fetch(`http://localhost:5000/api/blogs/unlike/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
          toast.success('Removed your like');
        }
      } 
      // If not already liked, increment the like count
      else if (result === 'liked') {
        // If was disliked, we need to update backend dislike count too
        if (isDisliked) {
          // No need to call dislike API here since we handle it in the like API
        }
        
        // Call the API to add/increment the like
        const response = await fetch(`http://localhost:5000/api/blogs/like/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
          toast.success('Thanks for liking this post!');
        }
      }
      
      // Invalidate blog query to refresh data
      queryClient.invalidateQueries({ queryKey: ["blogInfo", id] });
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error('Failed to update like status');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDislike = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      // Toggle dislike in local state
      const result = doToggleDislike(id as string);
      
      // If disliked and was previously liked, we need to decrement the like count
      if (result === 'disliked' && isLiked) {
        // Call API to handle the dislike (which should also handle removing the like)
        const response = await fetch(`http://localhost:5000/api/blogs/dislike/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setLocalLikes(data.likes);
          toast.success('Post disliked');
        }
      } 
      // If undisliked, no change to like count needed
      else if (result === 'undisliked') {
        toast.success('Dislike removed');
        // No API call needed here as we don't track dislikes count in backend
      }
      
      // Invalidate blog query to refresh data
      queryClient.invalidateQueries({ queryKey: ["blogInfo", id] });
    } catch (error) {
      console.error("Error handling dislike:", error);
      toast.error('Failed to update dislike status');
    } finally {
      setIsProcessing(false);
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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:5000/api/blogs/comment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          author: commentAuthor.trim() || 'Anonymous'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Comment added successfully');
        setComment('');
        // Refetch comments to show the new one
        refetchComments();
        // Invalidate blog query to refresh data
        queryClient.invalidateQueries({ queryKey: ["blogInfo", id] });
      } else {
        toast.error(data.error || 'Failed to add comment');
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy • h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const fallbackImage = "https://shorturl.at/6w7NB";

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />
      {error && <div className="text-red-500 text-center p-4">{(error as Error).message}</div>}
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
                  onClick={handleLike}
                  className={`flex items-center px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isLiked 
                      ? 'text-red-500 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
                  }`}
                  disabled={isProcessing}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <BiSolidHeartSquare className={`mr-1 ${isProcessing ? 'animate-pulse' : ''}`} size={18} />
                  <span className="text-sm">{localLikes}</span>
                </button>
                
                <button
                  onClick={handleDislike}
                  className={`flex items-center px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isDisliked 
                      ? 'text-blue-500 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                  disabled={isProcessing}
                  aria-label={isDisliked ? "Remove dislike" : "Dislike"}
                >
                  <BiDislike className={`${isProcessing ? 'animate-pulse' : ''}`} size={18} />
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
          
          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" id="comments">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white flex items-center">
              <BiCommentDetail className="mr-2" />
              Comments ({comments.length})
            </h2>
            
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={commentAuthor}
                  onChange={e => setCommentAuthor(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={4}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="flex items-center" 
                disabled={isSubmitting}
              >
                <BiSend className="mr-2" />
                {isSubmitting ? 'Submitting...' : 'Post Comment'}
              </Button>
            </form>
            
            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment: Comment) => (
                  <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex items-start">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 dark:text-gray-300 mr-3">
                        {comment.author?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{comment.author || 'Anonymous'}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlogPage;