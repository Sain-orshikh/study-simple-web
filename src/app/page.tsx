"use client"

import { useState, useEffect, useRef } from "react"
import Sidebar from "@/components/sidebar/sidebar"
import { HeroSection } from "@/components/home/HeroSection"
import { EventImageCarousel } from "@/components/home/EventImageCarousel" 
import { WhyUseSection } from "@/components/home/WhyUseSection"
import { LatestUpdates } from "@/components/home/LatestUpdates"
import { CallToAction } from "@/components/home/CallToAction"
import { Footer } from "@/components/home/Footer"
import { NextEventNotification } from "@/components/home/NextEventNotification"
import { MusicIcon, GlobeIcon, LaptopIcon, Calendar } from "lucide-react"
import { eventsData, getUpcomingEvents, getPastEvents } from "@/data/events"
import React from "react"

// Properly defining the Event type to match component requirements
interface Event {
  title: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  link: string;
  date: string;
  dateString: string;
  eventDate: Date;
  location: string;
  image?: string;
}

export default function Home() {
  // Scroll state for showing elements after hero section
  const [showElements, setShowElements] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  // Track scroll position to show elements after hero section
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight
        const scrollPosition = window.scrollY
        
        // On initial load, hide elements
        if (scrollPosition < 50) {
          setShowElements(false)
        } 
        // Show elements after scrolling past hero section
        else if (scrollPosition > heroHeight * 0.7) {
          setShowElements(true)
        }
      }
    }

    // Set initial state - initially show elements for better UX
    setShowElements(true)
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Format events from eventsData to match the expected format for the carousel
  const formattedEvents: Event[] = eventsData.map(event => ({
    title: event.title,
    description: event.description,
    icon: event.icon as React.ReactElement<{ className?: string }>,
    link: event.link || `/events/${event.id}`,
    date: event.dateString,
    dateString: event.date, // Using the ISO date string
    eventDate: event.eventDate,
    location: event.location,
    image: event.imageUrl // Using imageUrl from the events data if available
  }))

  // Get 4 featured events (prioritizing the Shark Tank and Midnight Masquerade events)
  const sharkTankEvent = eventsData.find(event => event.id === "shark-tank-2024");
  const masqueradeEvent = eventsData.find(event => event.id === "midnight-masquerade");
  const featuredEvents: Event[] = [
    ...(sharkTankEvent ? [sharkTankEvent] : []), // Add Shark Tank as first event if found
    ...(masqueradeEvent ? [masqueradeEvent] : []), // Add Midnight Masquerade as second event if found
    ...getPastEvents(eventsData)
      .filter(event => event.id !== "shark-tank-2024" && event.id !== "midnight-masquerade") // Exclude already added events
      .filter(event => event.id !== "alumni-forum-2025") // Explicitly exclude the Alumni Forum event
      .slice(0, 2) // Get 2 other past events (to make a total of 4 with the two prioritized events)
  ].slice(0, 4) // Ensure we have at most 4 events
    .map(event => ({
      title: event.title,
      description: event.description,
      icon: event.icon as React.ReactElement<{ className?: string }>,
      link: event.link || `/events/${event.id}`,
      date: event.dateString,
      dateString: event.date,
      eventDate: event.eventDate,
      location: event.location,
      image: event.imageUrl
    }));

  // Get upcoming events for the notification
  const upcomingEvents: Event[] = getUpcomingEvents(eventsData).map(event => ({
    title: event.title,
    description: event.description,
    icon: event.icon as React.ReactElement<{ className?: string }>,
    link: event.link || `/events/${event.id}`,
    date: event.dateString,
    dateString: event.date,
    eventDate: event.eventDate,
    location: event.location,
    image: event.imageUrl
  }))

  // Study resources data
  const resources = [
    {
      title: "Math Study Guide",
      description: "Comprehensive guide to calculus fundamentals",
      link: "/studies",
      status: "New"
    },
    {
      title: "Literature Notes",
      description: "Analysis of classic literary works",
      link: "/studies",
      status: "Popular"
    },
    {
      title: "Chemistry Flashcards",
      description: "Interactive flashcards for organic chemistry",
      link: "/studies",
      status: "Updated"
    }
  ]

  return (
    <Sidebar>
      <div ref={heroRef} className="w-full relative">
        <HeroSection />
      </div>
      
      {/* Always show the notification (not dependent on scroll) */}
      <NextEventNotification events={upcomingEvents} />
      
      {/* Animated carousel showing featured events */}
      <EventImageCarousel events={featuredEvents} />
      
      <WhyUseSection />
      <LatestUpdates resources={resources} />
      <CallToAction />
      <Footer />
    </Sidebar>
  )
}

