"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar/sidebar"
import { Card } from "@/components/ui/card"
import { 
  Calendar, Clock, MapPin, ArrowRight, Search, 
  GraduationCap, Sparkles, PartyPopper, Music, BookOpen,
  Trophy, School, Award, HeartHandshake, Rocket
} from "lucide-react"
import { motion } from "framer-motion"
import { EventProposalModal } from "@/components/ui/EventProposalModal"
import { Event, eventsData, getUpcomingEvents, getPastEvents, getNextEvent } from "@/data/events"

// Function to get category-specific icons and colors
function getCategoryStyles(category: string, eventId?: string): { 
  icon: React.ReactNode, 
  bgColor: string,
  patternClass: string 
} {
  // Handle specific events by ID
  if (eventId) {
    switch(eventId) {
      case "graduation-ceremony-2025":
        return { 
          icon: <GraduationCap className="h-16 w-16 text-purple-700" />,
          bgColor: 'bg-purple-100',
          patternClass: 'bg-purple-200 opacity-25'
        };
      case "5-day-fun":
        return { 
          icon: <PartyPopper className="h-16 w-16 text-red-600" />,
          bgColor: 'bg-red-50',
          patternClass: 'bg-red-100 opacity-25'
        };
      case "teachers-day-2024":
        return { 
          icon: <BookOpen className="h-16 w-16 text-green-600" />,
          bgColor: 'bg-green-50',
          patternClass: 'bg-green-100 opacity-25'
        };
    }
  }
  
  // Default category-based styles
  switch(category.toLowerCase()) {
    case 'academic':
      return { 
        icon: <BookOpen className="h-16 w-16 text-indigo-600" />,
        bgColor: 'bg-indigo-100',
        patternClass: 'bg-indigo-200 opacity-25'
      };
    case 'sports':
      return { 
        icon: <Trophy className="h-16 w-16 text-emerald-600" />,
        bgColor: 'bg-emerald-100',
        patternClass: 'bg-emerald-200 opacity-25'
      };
    case 'school spirit':
      return { 
        icon: <School className="h-16 w-16 text-amber-600" />,
        bgColor: 'bg-amber-100',
        patternClass: 'bg-amber-200 opacity-25'
      };
    case 'social':
      return { 
        icon: <HeartHandshake className="h-16 w-16 text-rose-600" />,
        bgColor: 'bg-rose-100',
        patternClass: 'bg-rose-200 opacity-25'
      };
    case 'career':
      return { 
        icon: <Award className="h-16 w-16 text-blue-600" />,
        bgColor: 'bg-blue-100',
        patternClass: 'bg-blue-200 opacity-25'
      };
    case 'entrepreneurship':
      return { 
        icon: <Rocket className="h-16 w-16 text-orange-600" />,
        bgColor: 'bg-orange-100',
        patternClass: 'bg-orange-200 opacity-25'
      };
    default:
      return { 
        icon: <Calendar className="h-16 w-16 text-[#5f2995]" />,
        bgColor: 'bg-[#5f2995]/10',
        patternClass: 'bg-[#5f2995]/20 opacity-25'
      };
  }
}

// Event Card Component
function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Get category-specific styles for events without images
  const { icon, bgColor, patternClass } = getCategoryStyles(event.category, event.id);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {event.imageUrl ? (
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className={`h-full w-full flex items-center justify-center ${bgColor} relative`}>
            {/* Decorative patterns */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Top left circles */}
              <div className={`absolute -top-4 -left-4 w-20 h-20 rounded-full ${patternClass}`}></div>
              <div className={`absolute top-8 left-8 w-12 h-12 rounded-full ${patternClass}`}></div>
              
              {/* Bottom right circles */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full ${patternClass}`}></div>
              <div className={`absolute bottom-12 right-6 w-10 h-10 rounded-full ${patternClass}`}></div>
              
              {/* Diagonal lines */}
              <div className={`absolute top-1/4 left-0 right-0 h-0.5 transform rotate-45 ${patternClass}`}></div>
              <div className={`absolute top-3/4 left-0 right-0 h-0.5 transform -rotate-45 ${patternClass}`}></div>
            </div>
            
            {/* Category-specific icon */}
            <div className="relative z-10 transform transition-transform duration-300 hover:scale-110">
              {icon}
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#5f2995] text-white text-xs font-medium px-2 py-1 rounded z-20">
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#5f2995] mb-2">{event.title}</h3>
        <p className="text-gray-700 text-sm mb-4">{event.description}</p>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{event.location}</span>
        </div>
        {event.link && event.link !== "https://maistimes.org" && (
          <div className="mt-3">
            <Link 
              href={event.link}
              className="text-[#5f2995] hover:text-[#8655ac] text-sm flex items-center transition-colors"
            >
              <span>Learn more</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}

// Next Event Countdown Component
function NextEventCountdown({ event }: { event: Event | null }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  
  React.useEffect(() => {
    if (!event) return;
    
    function updateTimer() {
      const now = new Date();
      if (!event) return;
      
      const diff = event.eventDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft("Happening now!");
        setDays(0);
        setHours(0);
        setMinutes(0);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }
    
    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [event]);
  
  if (!event) return null;
  
  // Check if it's the graduation event
  const isGraduation = event.title.toLowerCase().includes("graduation");
  
  // Use more elaborate design for graduation event
  if (isGraduation) {
    return (
      <section className="py-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-200 dark:border-purple-800">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side: Animation */}
            <div className="bg-gradient-to-br from-[#5f2995] to-[#8655ac] p-8 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Graduation cap animation */}
              <motion.div 
                className="relative z-10"
                initial="initial"
                whileHover="hover"
                animate="initial"
              >
                <motion.div
                  variants={{
                    hover: {
                      y: [-10, 0, -5, 0],
                      rotate: [0, -10, 10, 0],
                      transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 3
                      }
                    }
                  }}
                  className="mb-2"
                >
                  <GraduationCap className="w-24 h-24 text-white" />
                </motion.div>
                
                {/* Animated sparkles */}
                <motion.div 
                  className="absolute top-0 right-3" 
                  variants={{
                    animate: {
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }
                    }
                  }}
                  animate="animate"
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-2 left-3" 
                  variants={{
                    animate: {
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }
                    }
                  }}
                  animate="animate"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Sparkles className="w-5 h-5 text-blue-300" />
                </motion.div>
              </motion.div>

              {/* Background decorations */}
              <div className="absolute left-4 top-4 opacity-10">
                <PartyPopper className="w-16 h-16 text-white" />
              </div>
              <div className="absolute right-4 bottom-4 opacity-10">
                <PartyPopper className="w-16 h-16 text-white" />
              </div>
              
              {/* Circulating dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full opacity-25"
                      animate={{
                        scale: [1, 1.5, 1],
                        x: [0, Math.cos(i * Math.PI / 4) * 70, 0],
                        y: [0, Math.sin(i * Math.PI / 4) * 70, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side: Countdown */}
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#5f2995] dark:text-[#b98cd1] mb-2">
                {event.title}
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.eventDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric'
                })}</span>
              </div>
              
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  TIME REMAINING
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#5f2995] dark:text-[#b98cd1]">
                      {days}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#5f2995] dark:text-[#b98cd1]">
                      {hours}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#5f2995] dark:text-[#b98cd1]">
                      {minutes}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Minutes</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Default design for other events
  return (
    <section className="bg-[#5f2995]/10 rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-2xl font-bold text-[#5f2995] mb-4">Next Upcoming Event</h2>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
          <h3 className="text-xl font-bold text-[#5f2995] mb-2">{event.title}</h3>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="flex items-center text-[#8655ac] mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{event.eventDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center text-[#8655ac]">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="text-[#5f2995] font-semibold mb-2">Time Remaining</div>
          <div className="bg-white rounded-lg shadow px-6 py-3 text-center">
            <div className="text-3xl font-bold text-[#8655ac]">{timeLeft}</div>
            <div className="text-xs text-gray-500">Until the event starts</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Search and filter component
function EventsFilter({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  categories
}: { 
  searchTerm: string; 
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative md:flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f2995] focus:border-transparent"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f2995] focus:border-transparent"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  
  // Get all unique categories
  const categories = Array.from(new Set(eventsData.map(event => event.category)));
  
  // Filter events based on search and category
  const filterEvents = (events: Event[]) => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  };
  
  const upcomingEvents = filterEvents(getUpcomingEvents(eventsData));
  const pastEvents = filterEvents(getPastEvents(eventsData));
  const nextEvent = getNextEvent(eventsData);

  // Function to open proposal modal
  const openProposalModal = () => {
    setIsProposalModalOpen(true);
  };

  // Function to close proposal modal
  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
  };

  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#5f2995]">School Events</h1>
          </div>
          
          {/* Next Event Countdown */}
          {nextEvent && <NextEventCountdown event={nextEvent} />}
          
          {/* Search and Filter */}
          <EventsFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
          
          {/* Events Tabs - Enhanced UI */}
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="flex w-full max-w-xs bg-gray-100 rounded-full p-0.5 shadow-inner">
                <button 
                  onClick={() => setSelectedTab('upcoming')}
                  className={`w-1/2 py-1.5 px-4 rounded-full text-center font-medium text-sm transition-all duration-200 ${
                    selectedTab === 'upcoming' 
                      ? 'bg-[#5f2995] text-white shadow-sm' 
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Upcoming Events
                  </div>
                </button>
                <button 
                  onClick={() => setSelectedTab('past')}
                  className={`w-1/2 py-1.5 px-4 rounded-full text-center font-medium text-sm transition-all duration-200 ${
                    selectedTab === 'past' 
                      ? 'bg-[#5f2995] text-white shadow-sm' 
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Past Events
                  </div>
                </button>
              </div>
            </div>
            
            {selectedTab === 'upcoming' ? (
              upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No upcoming events found matching your criteria.</p>
                </div>
              )
            ) : (
              pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No past events found matching your criteria.</p>
                </div>
              )
            )}
          </div>
          
          {/* More Information Banner */}
          <div className="bg-gradient-to-r from-[#5f2995]/10 to-[#8655ac]/10 rounded-lg p-6 shadow-md border border-[#5f2995]/20 mt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                <h2 className="text-xl font-bold text-[#5f2995] mb-2">For More Information</h2>
                <p className="text-gray-700">
                  Visit <span className="font-medium">MAIS Times</span> for additional event details, photo galleries, event recaps, 
                  and community announcements. Stay connected and never miss an update from our school community.
                </p>
              </div>
              <div>
                <a 
                  href="https://www.maistimes.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-[#5f2995] py-3 px-6 text-white font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50 shadow-sm"
                >
                  <span>Visit MAIS Times</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Propose Event CTA */}
          <div className="bg-gradient-to-r from-[#5f2995]/10 to-[#8655ac]/10 rounded-lg p-6 shadow-md border border-[#5f2995]/20 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                <h2 className="text-xl font-bold text-[#5f2995] mb-2">Have an Event Idea?</h2>
                <p className="text-gray-700">
                  We welcome suggestions for school events from students, parents, and staff.
                </p>
              </div>
              <div>
                <button 
                  onClick={openProposalModal}
                  className="inline-flex items-center justify-center rounded-md bg-[#5f2995] py-3 px-6 text-white font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50 shadow-sm"
                >
                  <span>Propose an Event</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Event Proposal Modal */}
      <EventProposalModal 
        open={isProposalModalOpen} 
        onClose={closeProposalModal} 
      />
    </>
  )
}