"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  BookIcon, 
  FileTextIcon,
  PencilIcon,
  BookOpenIcon,
  ShoppingCartIcon
} from "lucide-react"

type Resource = {
  title: string;
  description: string;
  link: string;
  status: string;
}

interface LatestUpdatesProps {
  resources: Resource[];
}

export function LatestUpdates({ resources }: LatestUpdatesProps) {
  // Sample recent blog post data - in a real implementation, this would come from an API
  const recentBlogs = [
    {
      title: "Crime podcast: Is it bad?",
      author: "Alex Rivera",
      date: "Apr 27, 2025",
      link: "/blogs"
    },
    {
      title: "The art of being alone",
      author: "Maya Chen",
      date: "Apr 29, 2025",
      link: "/blogs"
    },
    {
      title: "Introduction to Greek Mythology",
      author: "Noah Thompson",
      date: "Apr 26, 2025",
      link: "/blogs"
    }
  ];

  // Featured study resources based on the actual content in the subjects data
  const featuredResources = [
    {
      title: "ICT Complete Guide",
      description: "Comprehensive overview of the IGCSE ICT curriculum (0417)",
      status: "Popular",
      link: "/studies?tab=igcse"
    },
    {
      title: "Biology: DNA and Protein Synthesis",
      description: "Complete guide to genetic processes and cell biology",
      status: "New",
      link: "/studies?tab=igcse"
    },
    {
      title: "Chemistry: Particulate Nature of Matter",
      description: "Key concepts in atomic structure and properties",
      status: "Updated",
      link: "/studies?tab=igcse"
    }
  ];

  // Sample marketplace listings
  const marketplaceItems = [
    {
      title: "Textbooks for Sale",
      description: "Find used textbooks at discount prices",
      link: "/market"
    },
    {
      title: "Study Materials Exchange",
      description: "Share and exchange study resources",
      link: "/market"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#5f2995] dark:text-[#b98cd1]">Latest Updates</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* First column: Student Marketplace */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <ShoppingCartIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
              <h3>Student Marketplace</h3>
            </div>
            <div className="space-y-4">
              {marketplaceItems.map((item, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-[#b98cd1]/10 dark:bg-[#5f2995]/20 text-[#5f2995] dark:text-[#b98cd1]">
                  <Link href={item.link} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="h-5 w-5" />
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <p className="text-sm text-[#5f2995]/80 dark:text-[#b98cd1]/80">{item.description}</p>
                  </Link>
                </Card>
              ))}
              <Link href="/market" className="w-full">
                <button className="w-full rounded-md border border-[#5f2995]/20 dark:border-[#b98cd1]/20 bg-transparent py-2 px-4 text-[#5f2995] dark:text-[#b98cd1] text-sm font-medium hover:bg-[#b98cd1]/20 dark:hover:bg-[#5f2995]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                  Browse Marketplace
                </button>
              </Link>
            </div>
          </div>
          
          {/* Second column: Study Resources */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <BookIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
              <h3>Study Resources</h3>
            </div>
            <div className="space-y-4">
              {featuredResources.map((resource, index) => (
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
          
          {/* Third column: Recent Blogs and Application Tips */}
          <div className="space-y-6">
            {/* Recent Blogs section */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-xl font-semibold mb-4">
                <PencilIcon className="h-5 w-5 text-[#5f2995] dark:text-[#b98cd1]" />
                <h3>Recent Blogs</h3>
              </div>
              <div className="space-y-3">
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
            
            {/* Application Tips Quick Access */}
            <div>
              <Card className="p-5 bg-gradient-to-br from-[#ead36b]/20 to-[#ead36b]/5 dark:from-[#ead36b]/10 dark:to-[#ead36b]/5 border-none text-[#5f2995] dark:text-[#b98cd1]">
                <div className="space-y-3">
                  <p className="font-medium">Application Tips</p>
                  <p className="text-sm text-[#5f2995]/80 dark:text-[#b98cd1]/80">Get access to our college application resources and guides</p>
                  <Link href="/application-tips" className="w-full">
                    <button className="w-full rounded-md bg-[#ead36b] dark:bg-[#ead36b]/80 py-2 px-4 text-[#5f2995] text-sm font-medium hover:bg-[#ead36b]/80 dark:hover:bg-[#ead36b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ead36b]/50">
                      Explore Tips
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