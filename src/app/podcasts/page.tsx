"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from "@/components/sidebar/sidebar"
import PodcastPlayer from '@/components/PodcastPlayer';
import { FaHeadphones, FaBell, FaRegCheckCircle, FaTimes, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PodcastPage = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [unsubEmail, setUnsubEmail] = useState('');
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [unsubLoading, setUnsubLoading] = useState(false);
  const [showUnsubForm, setShowUnsubForm] = useState(false);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!unsubEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    setUnsubLoading(true);
    try {
      const response = await fetch('/api/podcast-subscribers/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: unsubEmail }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to unsubscribe');
      }
      
      toast.success("You've been unsubscribed successfully");
      setUnsubEmail('');
      setShowUnsubForm(false);
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("Failed to unsubscribe. Please try again.");
    } finally {
      setUnsubLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/podcast-subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
      
      const data = await response.json();
      toast.success(data.message || "Subscribed successfully!");
      setEmail('');
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const podcasts = [
    {
      id: 1,
      title: "Podcast No.1: Guest - Nemuulen_23C",
      image: "/podcasts/podcastcart1.png",
      audioSrc: "/podcasts/podcast1.mp3",
      category: "Educational"
    },
    {
      id: 2,
      title: "Podcast No.2: Guest- Enkhjin.B_23C",
      image: "/podcasts/podcastcard2.png",
      audioSrc: "/podcasts/podcast2.mp3",
      category: "Productivity"
    },
    {
      id: 3,
      title: "Podcast No.3: Guest - Nomin.M_23C",
      image: "/podcasts/podcastcart3.png",
      audioSrc: "/podcasts/podcast3.mp3",
      category: "Motivation"
    },
    {
      id: 4,
      title: "Podcast No.4: Guest - Erdenegereltekh_23A",
      image: "/podcasts/podcastcard4.png",
      audioSrc: "/podcasts/podcast4.mp3",
      category: "Health"
    },
    {
      id: 5,
      title: "Podcast No.5: Guest- Temuulen_23D",
      image: "/podcasts/podcastcard5.png",
      audioSrc: "/podcasts/podcast5.mp3",
      category: "Educational"
    }
  ];
  
  return (
    <>
      <Sidebar>
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Status message for unsubscribe action */}
            {statusMessage.message && (
              <div className={`my-4 p-4 rounded-lg flex items-center ${
                statusMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {statusMessage.type === 'success' ? (
                  <FaRegCheckCircle className="mr-2" />
                ) : (
                  <FaExclamationCircle className="mr-2" />
                )}
                {statusMessage.message}
              </div>
            )}

            {/* Hero Section */}
            <div className="py-10 text-center">
              <div className="flex justify-center mb-4">
                <FaHeadphones className="text-5xl text-blue-600" />
              </div>
              <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Study Simple Podcasts
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In here, you can hear what people who have successfully been accepted to top universities say. And learn from their mistakes and experiences.
              </p>
            </div>
            
            {/* Podcast List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {podcasts.map((podcast) => (
                <div key={podcast.id} className="podcast-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="p-4 pb-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{podcast.title}</h2>
                    <div className="text-xs text-gray-500 mb-3">Episode {podcast.id}</div>
                  </div>
                  
                  <div className="px-4">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <img 
                        src={podcast.image} 
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <PodcastPlayer 
                      audioSrc={podcast.audioSrc}
                      speaker={{
                        name: podcast.title,
                        image: podcast.image,
                        title: ""
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* New Podcast Subscription Section */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200 mb-12">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-indigo-100 rounded-full opacity-70 blur-xl"></div>
              
              <div className="relative py-12 px-6 sm:px-12 text-center">
                <div className="mb-6 inline-flex items-center justify-center p-3 bg-blue-50 rounded-full">
                  <FaBell className="text-2xl text-blue-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Never Miss an Episode</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join our community of ambitious students and get new episodes directly in your inbox. 
                  Stay updated with the latest podcast conversations with successful university applicants.
                </p>
                
                <button 
                  onClick={() => setSubscribeModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
      
      {/* Subscribe Modal */}
      {subscribeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md relative animate-fade-in-up">
            <button 
              onClick={() => {
                setSubscribeModal(false);
                setSubscribeSuccess(false);
                setSubscribeError('');
                setEmail('');
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="p-6 sm:p-8">
              {!subscribeSuccess ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Podcast</h3>
                  <p className="text-gray-600 mb-6">Get notifications for new episodes and exclusive content</p>
                  
                  <form onSubmit={handleSubscribe}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-lg border ${subscribeError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        disabled={loading}
                      />
                      {subscribeError && (
                        <p className="mt-1 text-sm text-red-600">{subscribeError}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-blue-400"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <FaSpinner className="animate-spin mr-2" />
                          Subscribing...
                        </span>
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <FaRegCheckCircle className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    You've successfully subscribed to our podcast updates. Check your inbox for a confirmation.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500 text-center">
              We respect your privacy and won't share your information. Unsubscribe anytime.
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PodcastPage;