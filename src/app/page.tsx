"use client"

import { useState, useEffect, useRef } from "react"
import Sidebar from "@/components/sidebar/sidebar"
import { HeroSection } from "@/components/home/HeroSection"
import { EventImageCarousel } from "@/components/home/EventImageCarousel" // Import the new image carousel
import { WhyUseSection } from "@/components/home/WhyUseSection"
import { LatestUpdates } from "@/components/home/LatestUpdates"
import { CallToAction } from "@/components/home/CallToAction"
import { Footer } from "@/components/home/Footer"
import { NextEventNotification } from "@/components/home/NextEventNotification"
import { MusicIcon, GlobeIcon, LaptopIcon } from "lucide-react"

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

  // Event data with dates converted for easier processing
  const events = [
    {
      title: "Talent Show 2025",
      description: "Showcase your talents and win amazing prizes in our annual talent show. Students from all grades can participate with musical performances, dance routines, magic tricks, and more!",
      icon: <MusicIcon className="h-5 w-5" />,
      link: "/events/talent-show",
      date: "May 15, 2025",
      dateString: "2025-05-15T18:00:00",
      location: "School Auditorium",
      image: "/events/talent-show.jpg"
    },
    {
      title: "Spirit Week",
      description: "Show your school spirit with themed dress-up days, pep rallies, and special activities throughout the week. Join in the fun with costume contests and school pride challenges!",
      icon: <GlobeIcon className="h-5 w-5" />,
      link: "/events/spirit-week",
      date: "June 1-5, 2025",
      dateString: "2025-06-01T09:00:00",
      location: "Main Campus",
      image: "/events/spirit-week.jpg"
    },
    {
      title: "Hackathon 2025",
      description: "Collaborate and code innovative solutions in our 48-hour coding competition. Form teams, tackle real-world problems, and compete for prizes while building your portfolio.",
      icon: <LaptopIcon className="h-5 w-5" />,
      link: "/events/hackathon",
      date: "April 30, 2025",
      dateString: "2025-04-30T10:00:00",
      location: "Computer Lab 3",
      image: "/events/hackathon.jpg"
    },
    {
      title: "Spring Club Fair",
      description: "Discover and join student clubs and organizations at our Spring Club Fair. Meet club representatives, learn about activities, and sign up for memberships.",
      icon: <LaptopIcon className="h-5 w-5" />,
      link: "/events/club-fair",
      date: "May 5, 2025",
      dateString: "2025-05-05T12:00:00",
      location: "Student Center",
      image: "/events/club-fair.jpg"
    }
  ].map(event => ({
    ...event,
    eventDate: new Date(event.dateString)
  }))

  // Check if the Hackathon event is in the past (based on current date April 23, 2025)
  const currentDate = new Date('2025-04-23')
  const activeEvents = events.filter(event => event.eventDate > currentDate)

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
    <Sidebar showSidebar={showElements}>
      <div ref={heroRef} className="w-full relative">
        <HeroSection />
      </div>
      
      {/* Always show the notification (not dependent on scroll) */}
      <NextEventNotification events={activeEvents} />
      
      {/* Animated carousel showing all events */}
      <EventImageCarousel events={events} />
      
      <WhyUseSection />
      <LatestUpdates events={events} resources={resources} />
      <CallToAction />
      <Footer />
    </Sidebar>
  )
}

