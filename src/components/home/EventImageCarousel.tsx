"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Event = {
  title: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  link: string;
  date: string;
  dateString: string;
  eventDate?: Date;
  location?: string;
  image?: string;
}

export function EventImageCarousel({ events }: { events: Event[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  
  const getIndices = () => {
    const prevIndex = (currentIndex - 1 + events.length) % events.length
    const nextIndex = (currentIndex + 1) % events.length
    return { prevIndex, currentIndex, nextIndex }
  }

  const defaultImages = [
    '/events/talent-show.jpg',
    '/events/spirit-week.jpg',
    '/events/hackathon.jpg',
    '/events/club-fair.jpg',
  ]

  const eventsWithImages = events.map((event, index) => ({
    ...event,
    image: event.image || defaultImages[index % defaultImages.length]
  }))

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex(prev => (prev + 1) % eventsWithImages.length)
      }, 5000)
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, eventsWithImages.length])

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + eventsWithImages.length) % eventsWithImages.length)
    resetAutoPlay()
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % eventsWithImages.length)
    resetAutoPlay()
  }

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1
    setDirection(newDirection)
    setCurrentIndex(index)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    setIsAutoPlaying(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      goToNext()
    } else if (touchEndX.current - touchStartX.current > 100) {
      goToPrevious()
    }
  }

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    })
  }

  if (eventsWithImages.length === 0) {
    return null
  }

  const { prevIndex, nextIndex } = getIndices()

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#5f2995] dark:text-[#b98cd1]">
          Featured Events
        </h2>

        <div className="relative overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative mx-auto h-[400px] md:h-[450px] flex items-center justify-center">
            <div className="relative w-full flex items-center">
              <div 
                className="absolute left-0 h-[320px] md:h-[370px] w-[15%] cursor-pointer rounded-l-lg shadow-lg overflow-hidden opacity-50 z-10 transform -translate-x-1/4 pointer-events-auto"
                onClick={goToPrevious}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={eventsWithImages[prevIndex].image}
                    alt={eventsWithImages[prevIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              </div>
              
              <div className="relative h-[400px] md:h-[450px] w-[80%] mx-auto z-20 rounded-lg shadow-2xl overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div 
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute w-full h-full"
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={eventsWithImages[currentIndex].image}
                        alt={eventsWithImages[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <motion.div 
                          className="mb-2 text-sm md:text-base font-medium bg-[#5f2995] w-fit px-3 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                        >
                          {formatEventDate(eventsWithImages[currentIndex].dateString)}
                        </motion.div>
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        >
                          {eventsWithImages[currentIndex].title}
                        </motion.h3>
                        <motion.p 
                          className="mb-4 text-white/90 max-w-3xl line-clamp-2 md:line-clamp-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          {eventsWithImages[currentIndex].description}
                        </motion.p>
                        <motion.div 
                          className="flex items-center text-white/80 text-sm mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <span className="flex items-center">
                            {eventsWithImages[currentIndex].location || "School Campus"}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.3 }}
                        >
                          <Link href={eventsWithImages[currentIndex].link === "https://maistimes.org" ? "/events" : eventsWithImages[currentIndex].link}>
                            <button className="px-5 py-2 bg-[#5f2995] hover:bg-[#8655ac] text-white rounded-md transition-colors duration-300">
                              Learn More
                            </button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div 
                className="absolute right-0 h-[320px] md:h-[370px] w-[15%] cursor-pointer rounded-r-lg shadow-lg overflow-hidden opacity-50 z-10 transform translate-x-1/4 pointer-events-auto"
                onClick={goToNext}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={eventsWithImages[nextIndex].image}
                    alt={eventsWithImages[nextIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              </div>
            </div>
            
            <button 
              className="absolute left-4 md:left-6 top-1/2 z-40 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-[#5f2995] rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5f2995]/50 pointer-events-auto"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            
            <button 
              className="absolute right-4 md:right-6 top-1/2 z-40 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-[#5f2995] rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5f2995]/50 pointer-events-auto"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {eventsWithImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#5f2995] scale-110' 
                    : 'bg-[#5f2995]/30 hover:bg-[#5f2995]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}