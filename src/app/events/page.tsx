"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar/sidebar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, MapPin, ArrowRight, Search } from "lucide-react"
import { EventDetailsModal } from "@/components/ui/EventDetailsModal"
import { EventProposalModal } from "@/components/ui/EventProposalModal"

// Define Event type
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  dateString: string;
  eventDate: Date;
  location: string;
  imageUrl?: string;
  category: string;
  link: string;
  icon: React.ReactElement;
}

// Sample event data
const eventsData: Event[] = [
  {
    id: "spirit-week",
    title: "Spirit Week",
    description: "A week full of school spirit and fun activities to bring our community together.",
    date: "2025-05-16",
    dateString: "May 16, 2025",
    eventDate: new Date("2025-05-16"),
    location: "School Campus",
    imageUrl: "/events/spirit-week-banner.jpg",
    category: "School Spirit",
    link: "/events/spirit-week",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "talent-show",
    title: "Annual Talent Show",
    description: "Showcase your unique talents and skills to the school community.",
    date: "2025-06-05",
    dateString: "June 5, 2025",
    eventDate: new Date("2025-06-05"),
    location: "School Auditorium",
    imageUrl: "/events/talent-show-banner.jpg",
    category: "Performances",
    link: "/events/talent-show",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "science-fair",
    title: "Science Fair",
    description: "Display innovative projects and experiments in this annual science exhibition.",
    date: "2025-05-25",
    dateString: "May 25, 2025",
    eventDate: new Date("2025-05-25"),
    location: "School Gymnasium",
    imageUrl: "/events/science-fair.jpg",
    category: "Academic",
    link: "/events/science-fair",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "career-day",
    title: "Career Day",
    description: "Meet professionals from various fields and learn about potential career paths.",
    date: "2025-09-10",
    dateString: "September 10, 2025",
    eventDate: new Date("2025-09-10"),
    location: "School Cafeteria",
    imageUrl: "/events/career-day.jpg",
    category: "Career",
    link: "/events/career-day",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "book-fair",
    title: "Book Fair",
    description: "Explore new books and engage with authors at our annual book fair.",
    date: "2025-08-15",
    dateString: "August 15, 2025",
    eventDate: new Date("2025-08-15"),
    location: "School Library",
    imageUrl: "/events/book-fair.jpg",
    category: "Academic",
    link: "/events/book-fair",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "sports-day",
    title: "Sports Day",
    description: "Participate in various sports competitions and cheer for your favorite teams.",
    date: "2025-04-30",
    dateString: "April 30, 2025",
    eventDate: new Date("2025-04-30"),
    location: "School Playground",
    imageUrl: "/events/sports-day.jpg",
    category: "Sports",
    link: "/events/sports-day",
    icon: <Calendar className="h-5 w-5" />
  }
];

// Function to get upcoming events
const getUpcomingEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to get past events
const getPastEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to get the next event
const getNextEvent = (events: Event[]) => {
  const upcomingEvents = getUpcomingEvents(events);
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
};

// Event Card Component
function EventCard({ event, onViewDetails }: { event: Event, onViewDetails: (event: Event) => void }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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
          <div className="h-full w-full flex items-center justify-center bg-[#5f2995]/10">
            <Calendar className="h-12 w-12 text-[#5f2995]" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#5f2995] text-white text-xs font-medium px-2 py-1 rounded z-20">
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#5f2995] mb-2">{event.title}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{event.location}</span>
        </div>
        <button 
          onClick={() => onViewDetails(event)}
          className="w-full rounded-md bg-[#5f2995] py-2 px-4 text-white text-sm font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50 flex items-center justify-center"
        >
          <span>View Details</span>
          <ArrowRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </Card>
  );
}

// Next Event Countdown Component
function NextEventCountdown({ event, onViewDetails }: { event: Event | null, onViewDetails: (event: Event) => void }) {
  const [timeLeft, setTimeLeft] = useState("");
  
  React.useEffect(() => {
    if (!event) return;
    
    function updateTimer() {
      const now = new Date();
      // Add null check to prevent TypeScript error
      if (!event) return;
      
      const diff = event.eventDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft("Happening now!");
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }
    
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [event]);
  
  if (!event) return null;
  
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
          <button 
            onClick={() => onViewDetails(event)}
            className="mt-4 rounded-md bg-[#5f2995] py-2 px-4 text-white text-sm font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50 flex items-center justify-center"
          >
            <span>View Event Details</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </button>
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Function to open the modal with the selected event
  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeEventModal = () => {
    setIsModalOpen(false);
  };

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
          {nextEvent && <NextEventCountdown event={nextEvent} onViewDetails={openEventModal} />}
          
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
                    <EventCard key={event.id} event={event} onViewDetails={openEventModal} />
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
                    <EventCard key={event.id} event={event} onViewDetails={openEventModal} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No past events found matching your criteria.</p>
                </div>
              )
            )}
          </div>
          
          {/* Propose Event CTA */}
          <div className="bg-[#b98cd1]/10 rounded-lg p-6 shadow-md mt-12">
            <h2 className="text-xl font-bold text-[#5f2995] mb-2">Have an Event Idea?</h2>
            <p className="text-gray-700 mb-4">We welcome suggestions for school events from students, parents, and staff.</p>
            <button 
              onClick={openProposalModal}
              className="rounded-md bg-[#5f2995] py-2 px-4 text-white text-sm font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50 inline-flex items-center"
            >
              <span>Propose an Event</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </Sidebar>

      {/* Event Details Modal */}
      <EventDetailsModal 
        event={selectedEvent} 
        open={isModalOpen} 
        onClose={closeEventModal} 
      />

      {/* Event Proposal Modal */}
      <EventProposalModal 
        open={isProposalModalOpen} 
        onClose={closeProposalModal} 
      />
    </>
  )
}