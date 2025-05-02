"use client"

import Sidebar from "@/components/sidebar/sidebar"
import { useQuery } from '@tanstack/react-query';
import { useState } from "react"
import BlogCard from "@/components/ui/BlogCard"
import { FaPenClip } from "react-icons/fa6";
import { SearchIcon, NewspaperIcon, TrendingUpIcon, FolderIcon, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(12);

  const {data:blogs, isLoading, isError} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      return data;
    },
    retry: 1,
  });
  
  const allBlogs = blogs?.data || [];

  // Define interface for blog type
  interface Blog {
    _id: string;
    image: string;
    title: string;
    content: string;
    category: string;
    author?: string;
    createdAt?: string;
  }

  // Enhanced filter function to properly handle categories
  const filteredBlogs = allBlogs.filter((blog: Blog) => {
    // Handle category matching correctly, accounting for case sensitivity
    const matchesCategory = selectedCategory === "All" || 
      blog.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    // Handle search query
    const matchesSearch = searchQuery === "" || 
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get displayed blogs based on current filters and pagination
  const displayedBlogs = filteredBlogs.slice(0, visibleBlogs);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum) => prevNum + 9);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Reset pagination when changing category
    setVisibleBlogs(12);
  };
  
  const categories = [
    "All",
    "Study Tips",
    "Productivity",
    "Study Skills",
    "Mental Health",
    "Technology",
    "Others"
  ];

  // Featured blogs (just taking first 3 blogs or fewer if not available)
  const featuredBlogs = allBlogs.slice(0, Math.min(3, allBlogs.length));

  return (
    <>
      <Sidebar>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <main className="space-y-8">
          {/* Header section */}
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <NewspaperIcon className="mr-3 text-blue-500" size={30} />
              Blogs
              <span className="relative ml-2 inline-block">
                <FaPenClip className="inline-block text-blue-500" size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover insightful articles and stories shared by our community
            </p>
          </div>

          {/* Featured blogs section - Desktop only */}
          {featuredBlogs.length > 0 && (
            <div className="hidden md:block rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <TrendingUpIcon className="mr-2 text-purple-600 dark:text-purple-400" size={20} />
                <h2 className="text-xl font-semibold">Featured Articles</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {featuredBlogs.map((blog: Blog) => (
                  <div key={`featured-${blog._id}`} className="transform transition-all duration-300 hover:scale-105">
                    <BlogCard blog={blog} isPreview={false} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and filter section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <SearchIcon size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category dropdown for mobile */}
              <div className="md:hidden w-full">
                <select 
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Category filters - Desktop */}
            <div className="hidden md:block mt-4">
              <div className="flex items-center mb-2">
                <FilterIcon size={16} className="mr-2 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-label={`${category} view`}
                    aria-pressed={selectedCategory === category}
                    className={`
                      inline-flex px-4 py-2 rounded-full items-center justify-center text-center transition-all
                      ${category === "All" ? "font-semibold" : ""} 
                      ${selectedCategory === category 
                        ? category === "All"
                          ? 'bg-purple-600 text-white ring-2 ring-purple-300 dark:ring-purple-900 shadow-md' 
                          : 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category === "All" ? (
                      <>
                        <FolderIcon size={14} className="mr-1" />
                        {category}
                      </>
                    ) : (
                      category
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Display category info */}
          {selectedCategory !== "All" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 flex items-center">
                <FilterIcon size={16} className="mr-2" />
                Showing blogs in category: <span className="font-bold ml-2">{selectedCategory}</span>
                <button 
                  onClick={() => handleCategoryChange("All")} 
                  className="ml-auto text-sm bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full hover:bg-blue-300 dark:hover:bg-blue-700"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}

          {/* Blog listing section */}
          <div>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : isError ? (
              <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-500 dark:text-red-400">Failed to load blogs. Please try again later.</p>
              </div>
            ) : displayedBlogs.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  No blogs found {selectedCategory !== "All" && `in category "${selectedCategory}"`} 
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
                {(selectedCategory !== "All" || searchQuery) && (
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Showing {displayedBlogs.length} of {filteredBlogs.length} blogs
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedBlogs.map((blog: Blog) => (
                    <div key={blog._id}>
                      <BlogCard blog={blog} isPreview={false} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Load more button */}
            {filteredBlogs.length > visibleBlogs && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  <span>Load More</span>
                  <span className="ml-2">•••</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      </Sidebar>
    </>
  )
}

