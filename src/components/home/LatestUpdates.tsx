"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  BookIcon, 
  Clock3Icon,
  FileTextIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  LaptopIcon,
  TrendingUpIcon,
  BellIcon,
  PencilIcon,
  GraduationCapIcon
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
  // Sample recent blog post data - in a real implementation, this would come from an API
  const recentBlogs = [
    {
      title: "How I Improved My Study Habits",
      author: "Emma Johnson",
      date: "Apr 20, 2025",
      link: "/blogs"
    },
    {
      title: "5 Tips for College Application Success",
      author: "Daniel Wang",
      date: "Apr 18, 2025",
      link: "/blogs"
    },
    {
      title: "My Research Project Experience",
      author: "Sophia Lee",
      date: "Apr 15, 2025",
      link: "/blogs"
    }
  ];

  // Get current school announcements - in a real implementation, these would be fetched from a backend
  const announcements = [
    {
      title: "Library Extended Hours During Finals",
      date: "Apr 22, 2025",
      link: "/others"
    },
    {
      title: "New Tutoring Program Available",
      date: "Apr 19, 2025",
      link: "/tutor"
    },
    {
      title: "Scholarship Applications Due Soon",
      date: "Apr 17, 2025",
      link: "/application-tips"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#5f2995] dark:text-[#b98cd1]">Campus Updates</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* First column: School Announcements (replacing Events) */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <BellIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
              <h3>School Announcements</h3>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-[#b98cd1]/10 dark:bg-[#5f2995]/20 text-[#5f2995] dark:text-[#b98cd1]">
                  <Link href={announcement.link} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{announcement.title}</span>
                      <span className="text-xs bg-[#5f2995]/10 dark:bg-[#b98cd1]/20 px-2 py-1 rounded-full text-[#8655ac] dark:text-[#b98cd1]">{announcement.date}</span>
                    </div>
                  </Link>
                </Card>
              ))}
              <Link href="/others" className="w-full">
                <button className="w-full rounded-md border border-[#5f2995]/20 dark:border-[#b98cd1]/20 bg-transparent py-2 px-4 text-[#5f2995] dark:text-[#b98cd1] text-sm font-medium hover:bg-[#b98cd1]/20 dark:hover:bg-[#5f2995]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                  All Announcements
                </button>
              </Link>
            </div>
          </div>
          
          {/* Second column: Study Resources (kept as is but enhanced) */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <BookIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
              <h3>Study Resources</h3>
            </div>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-[#b98cd1]/10 dark:bg-[#5f2995]/20 text-[#5f2995] dark:text-[#b98cd1]">
                  <Link href={resource.link} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileTextIcon className="h-5 w-5" />
                        <span className="font-semibold">{resource.title}</span>
                      </div>
                      <span className="text-xs bg-[#5f2995]/10 dark:bg-[#b98cd1]/20 px-2 py-1 rounded-full text-[#8655ac] dark:text-[#b98cd1]">{resource.status}</span>
                    </div>
                    <p className="text-sm text-[#5f2995]/80 dark:text-[#b98cd1]/80">{resource.description}</p>
                  </Link>
                </Card>
              ))}
              <Link href="/studies" className="w-full">
                <button className="w-full rounded-md border border-[#5f2995]/20 dark:border-[#b98cd1]/20 bg-transparent py-2 px-4 text-[#5f2995] dark:text-[#b98cd1] text-sm font-medium hover:bg-[#b98cd1]/20 dark:hover:bg-[#5f2995]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                  All Resources
                </button>
              </Link>
            </div>
          </div>
          
          {/* Third column: Split into Recent Blogs and Quick Access */}
          <div className="space-y-6">
            {/* Recent Blogs section */}
            <div>
              <div className="flex items-center space-x-2 text-xl font-semibold mb-4">
                <PencilIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
                <h3>Recent Blogs</h3>
              </div>
              <div className="space-y-3 mb-5">
                {recentBlogs.map((blog, index) => (
                  <Card key={index} className="p-3 hover:shadow-md transition-shadow bg-[#b98cd1]/10 dark:bg-[#5f2995]/20 text-[#5f2995] dark:text-[#b98cd1]">
                    <Link href={blog.link} className="block">
                      <h4 className="font-medium text-sm mb-1">{blog.title}</h4>
                      <div className="flex justify-between items-center text-xs text-[#8655ac]/80 dark:text-[#b98cd1]/80">
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                      </div>
                    </Link>
                  </Card>
                ))}
                <Link href="/blogs" className="block text-[#8655ac] dark:text-[#b98cd1] text-sm font-medium hover:underline text-center mt-2">
                  View All Blogs →
                </Link>
              </div>
            </div>
            
            {/* Quick Access Cards */}
            <div className="space-y-4">
              <Card className="p-5 bg-gradient-to-br from-[#ead36b]/20 to-[#ead36b]/5 dark:from-[#ead36b]/10 dark:to-[#ead36b]/5 border-none text-[#5f2995] dark:text-[#b98cd1]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <GraduationCapIcon className="h-5 w-5" />
                    <p className="font-medium">Need a tutor?</p>
                  </div>
                  <p className="text-sm text-[#5f2995]/80 dark:text-[#b98cd1]/80">Find expert tutors for any subject to help with your studies</p>
                  <Link href="/tutor" className="w-full">
                    <button className="w-full rounded-md bg-[#ead36b] dark:bg-[#ead36b]/80 py-2 px-4 text-[#5f2995] text-sm font-medium hover:bg-[#ead36b]/80 dark:hover:bg-[#ead36b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ead36b]/50">
                      Find a Tutor
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}