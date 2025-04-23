"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, BookOpenIcon, ShoppingBagIcon, UsersIcon, CalendarIcon } from "lucide-react"
import { TextEffect } from "@/components/animation/texteffect"

export function HeroSection() {
  return (
    <section className="relative text-white py-20 overflow-hidden">
      {/* Background gradient with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5f2995] to-[#8655ac] opacity-90"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMSAxLTEyIDAgNiA2IDAgMCAxIDEyIDB6bTIwLTEyYTYgNiAwIDEgMS0xMiAwIDYgNiAwIDAgMSAxMiAwem0wIDI0YTYgNiAwIDEgMS0xMiAwIDYgNiAwIDAgMSAxMiAwek0xNiA0MmE2IDYgMCAxIDEtMTIgMCA2IDYgMCAwIDEgMTIgMHptMC0yNGE2IDYgMCAxIDEtMTIgMCA2IDYgMCAwIDEgMTIgMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container relative mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <TextEffect 
            preset="fade-in-blur" 
            per="word" 
            speedReveal={0.8}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 max-w-4xl"
          >
            Your Complete Student Success Hub
          </TextEffect>
          
          <TextEffect
            preset="slide"
            per="word"
            delay={0.5}
            className="text-xl text-white/80 max-w-2xl mt-4"
          >
            Everything you need to excel in your academic journey, all in one place.
          </TextEffect>
        </div>

        {/* Main featured cards with clear visual navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link href="/market" className="group">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center text-center">
              <ShoppingBagIcon className="h-12 w-12 mb-4 text-white" />
              <TextEffect preset="blur" per="word" delay={0.8} className="text-xl font-semibold mb-2">
                Marketplace
              </TextEffect>
              <TextEffect preset="fade" per="word" delay={1} className="text-white/80 mb-4">
                Buy and sell textbooks, supplies, and more
              </TextEffect>
              <span className="text-white/90 group-hover:text-white flex items-center text-sm mt-auto">
                Explore Marketplace <ArrowRightIcon className="ml-1 h-4 w-4" />
              </span>
            </div>
          </Link>
          
          <Link href="/school-clubs" className="group">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center text-center">
              <UsersIcon className="h-12 w-12 mb-4 text-white" />
              <TextEffect preset="blur" per="word" delay={1} className="text-xl font-semibold mb-2">
                School Clubs
              </TextEffect>
              <TextEffect preset="fade" per="word" delay={1.2} className="text-white/80 mb-4">
                Find and join student clubs and activities
              </TextEffect>
              <span className="text-white/90 group-hover:text-white flex items-center text-sm mt-auto">
                Find Clubs <ArrowRightIcon className="ml-1 h-4 w-4" />
              </span>
            </div>
          </Link>
          
          <Link href="/study-tools" className="group">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center text-center">
              <BookOpenIcon className="h-12 w-12 mb-4 text-white" />
              <TextEffect preset="blur" per="word" delay={1.2} className="text-xl font-semibold mb-2">
                Study Tools
              </TextEffect>
              <TextEffect preset="fade" per="word" delay={1.4} className="text-white/80 mb-4">
                Access resources and guides to improve your grades
              </TextEffect>
              <span className="text-white/90 group-hover:text-white flex items-center text-sm mt-auto">
                Explore Tools <ArrowRightIcon className="ml-1 h-4 w-4" />
              </span>
            </div>
          </Link>
          
          <Link href="/events" className="group">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center text-center">
              <CalendarIcon className="h-12 w-12 mb-4 text-white" />
              <TextEffect preset="blur" per="word" delay={1.4} className="text-xl font-semibold mb-2">
                Events
              </TextEffect>
              <TextEffect preset="fade" per="word" delay={1.6} className="text-white/80 mb-4">
                Stay updated on campus events and activities
              </TextEffect>
              <span className="text-white/90 group-hover:text-white flex items-center text-sm mt-auto">
                View Events <ArrowRightIcon className="ml-1 h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/application-tips">
            <div className="inline-block">
              <button className="h-12 rounded-md bg-white py-2 px-8 text-[#5f2995] text-base font-medium hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg flex items-center mx-auto animate-fadeIn">
                Download Application Guide
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}