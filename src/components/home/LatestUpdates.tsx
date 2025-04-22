"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  CalendarIcon, 
  BookIcon, 
  Clock3Icon,
  FileTextIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  LaptopIcon
} from "lucide-react"

type Event = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  date: string;
}

type Resource = {
  title: string;
  description: string;
  link: string;
  status: string;
}

interface LatestUpdatesProps {
  events: Event[];
  resources: Resource[];
}

export function LatestUpdates({ events, resources }: LatestUpdatesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#5f2995]">Latest Updates</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <CalendarIcon className="h-5 w-5 text-[#5f2995]" />
              <h3>Upcoming Events</h3>
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-[#b98cd1]/10 text-[#5f2995]">
                  <Link href={event.link} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {event.icon}
                        <span className="font-semibold">{event.title}</span>
                      </div>
                      <span className="text-sm text-[#8655ac]">{event.date}</span>
                    </div>
                    <p className="text-sm text-[#5f2995]/80">{event.description}</p>
                  </Link>
                </Card>
              ))}
              <Link href="/events" className="w-full">
                <button className="w-full rounded-md border bg-transparent py-2 px-4 text-[#5f2995] text-sm font-medium hover:bg-[#b98cd1]/20 hover:text-[#5f2995] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                  All Events
                </button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <BookIcon className="h-5 w-5 text-[#5f2995]" />
              <h3>Study Resources</h3>
            </div>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-[#b98cd1]/10 text-[#5f2995]">
                  <Link href={resource.link} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileTextIcon className="h-5 w-5" />
                        <span className="font-semibold">{resource.title}</span>
                      </div>
                      <span className="text-sm text-[#8655ac]">{resource.status}</span>
                    </div>
                    <p className="text-sm text-[#5f2995]/80">{resource.description}</p>
                  </Link>
                </Card>
              ))}
              <Link href="/studies" className="w-full">
                <button className="w-full rounded-md border bg-transparent py-2 px-4 text-[#5f2995] text-sm font-medium hover:bg-[#b98cd1]/20 hover:text-[#5f2995] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                  All Resources
                </button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <Clock3Icon className="h-5 w-5 text-[#5f2995]" />
              <h3>Quick Access</h3>
            </div>
            <Card className="p-5 bg-[#ead36b]/10 border-none text-[#5f2995]">
              <div className="space-y-4">
                <p className="font-medium text-[#5f2995]">Need a tutor?</p>
                <p className="text-sm text-[#5f2995]/80">Find expert tutors for any subject to help with your studies</p>
                <Link href="/tutor" className="w-full">
                  <button className="w-full rounded-md bg-[#ead36b] py-2 px-4 text-[#5f2995] text-sm font-medium hover:bg-[#ead36b]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ead36b]/50">
                    Find a Tutor
                  </button>
                </Link>
              </div>
            </Card>
            <Card className="p-5 border border-[#b98cd1]/20 bg-[#b98cd1]/10 text-[#5f2995]">
              <div className="space-y-3">
                <h4 className="font-medium">Popular Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/market" className="text-[#8655ac] hover:underline flex items-center">
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Student Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link href="/application-tips" className="text-[#8655ac] hover:underline flex items-center">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Application Tips
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="text-[#8655ac] hover:underline flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-2" />
                      Student Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="/study-tools" className="text-[#8655ac] hover:underline flex items-center">
                      <LaptopIcon className="h-4 w-4 mr-2" />
                      Study Tools
                    </Link>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}