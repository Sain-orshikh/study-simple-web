"use client"

import Sidebar from "@/components/sidebar/sidebar"
import { HeroSection } from "@/components/home/HeroSection"
import { EventCountdown } from "@/components/home/EventCountdown"
import { WhyUseSection } from "@/components/home/WhyUseSection"
import { LatestUpdates } from "@/components/home/LatestUpdates"
import { CallToAction } from "@/components/home/CallToAction"
import { Footer } from "@/components/home/Footer"
import { NextEventNotification } from "@/components/home/NextEventNotification"
import { MusicIcon, GlobeIcon, LaptopIcon } from "lucide-react"

export default function Home() {
  // Event data
  const events = [
    {
      title: "Talent Show 2025",
      description: "Showcase your talents and win amazing prizes",
      icon: <MusicIcon className="h-5 w-5" />,
      link: "/events/talent-show",
      date: "May 15, 2025",
      dateString: "2025-05-15T18:00:00",
      location: "School Auditorium"
    },
    {
      title: "Spirit Week",
      description: "Show your school spirit with themed dress-up days",
      icon: <GlobeIcon className="h-5 w-5" />,
      link: "/events/spirit-week",
      date: "June 1-5, 2025",
      dateString: "2025-06-01T09:00:00",
      location: "Main Campus"
    },
    {
      title: "Hackathon 2025",
      description: "Collaborate and code innovative solutions",
      icon: <LaptopIcon className="h-5 w-5" />,
      link: "/events/hackathon",
      date: "April 30, 2025",
      dateString: "2025-04-30T10:00:00",
      location: "Computer Lab 3"
    }
  ]

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
      <div className="container mx-auto px-4">
        <NextEventNotification events={events} />
      </div>
      <HeroSection />
      <EventCountdown events={events} />
      <WhyUseSection />
      <LatestUpdates events={events} resources={resources} />
      <CallToAction />
      <Footer />
    </Sidebar>
  )
}

