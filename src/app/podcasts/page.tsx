"use client"

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar/navbar';
import PodcastPlayer from '@/components/PodcastPlayer';
import { FaHeadphones, FaSearch } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';

const PodcastPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Update the podcasts with more accurate descriptions
  const podcasts = [
    {
      id: 1,
      speaker: {
        name: "Dr. Jane Smith",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        title: "The Science of Effective Learning Techniques",
      },
      audioSrc: "/podcast-sample.mp3", // Replace with your audio file
      category: "Educational"
    },
    {
      id: 2,
      speaker: {
        name: "Prof. Mark Johnson",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        title: "Productivity Mastery",
      },
      audioSrc: "/podcast-sample2.mp3", // Replace with your audio file
      category: "Productivity"
    },
    {
      id: 3,
      speaker: {
        name: "Sarah Williams",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        title: "Health and Focus",
      },
      audioSrc: "/podcast-sample3.mp3", // Replace with your audio file
      category: "Health"
    }
  ];
  
  const categories = ['All', 'Educational', 'Productivity', 'Health', 'Motivation'];
  
  const filteredPodcasts = selectedCategory === 'All' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === selectedCategory);
  
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="py-10 text-center">
            <div className="flex justify-center mb-4">
              <FaHeadphones className="text-5xl text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Study Simple Podcasts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your learning experience with our curated collection of educational podcasts.
              Listen, learn, and grow at your own pace.
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex overflow-x-auto pb-2 space-x-2 my-2">
              <MdFilterList className="text-2xl text-gray-600 mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative my-2">
              <input
                type="text"
                placeholder="Search podcasts..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Podcast List */}
          <div className="grid grid-cols-1 gap-8 mb-12">
            {filteredPodcasts.map((podcast) => (
              <div key={podcast.id} className="podcast-item">
                <PodcastPlayer 
                  audioSrc={podcast.audioSrc}
                  speaker={podcast.speaker}
                />
                <div className="mt-3 ml-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {podcast.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredPodcasts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No podcasts found in this category.</p>
            </div>
          )}
          
          {/* Newsletter Signup */}
          <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white mb-12">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Podcast Updates</h2>
            <p className="mb-6">Get notified when new episodes are released</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastPage;