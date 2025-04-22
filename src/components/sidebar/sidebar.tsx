"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BookOpen,
  BookMarked,
  Brain,
  Users,
  Podcast,
  Lightbulb,
  Store,
  MoreHorizontal,
  HomeIcon,
  Newspaper,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'
import logo from "@/assets/logo.png"

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [clientWidth, setClientWidth] = useState(0)
  
  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true)
    
    // Set default sidebar state based on screen size
    const width = window.innerWidth
    setClientWidth(width)
    setSidebarOpen(width >= 768)
    
    const handleResize = () => {
      const newWidth = window.innerWidth
      setClientWidth(newWidth)
      if (newWidth < 768) {
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/blogs', label: 'Blogs', icon: <Newspaper className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/studies', label: 'Studies', icon: <BookOpen className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/study-tools', label: 'Study Tools', icon: <Brain className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/about-us', label: 'About Us', icon: <Users className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/school-clubs', label: 'School Clubs', icon: <BookMarked className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/podcasts', label: 'Podcasts', icon: <Podcast className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/application-tips', label: 'Application Tips', icon: <Lightbulb className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/market', label: 'Market', icon: <Store className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/others', label: 'Others', icon: <MoreHorizontal className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
  ]

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:static top-0 left-0 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm z-20 transition-all duration-300 ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Sidebar Header with Close Button */}
          <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
            <div className={`flex items-center transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <img src={logo.src} alt="Logo" className="h-8 w-8 mr-2" />
              <h2 className={`text-lg font-semibold text-[#5f2995] dark:text-[#b98cd1] whitespace-nowrap ${sidebarOpen ? '' : 'hidden md:hidden'}`}>
                Study Simple
              </h2>
            </div>
            
            {/* Close sidebar button - only visible on desktop when sidebar is open */}
            <button 
              onClick={toggleSidebar}
              className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-opacity duration-300 md:block ${
                sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
              }`}
              aria-label="Close sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-grow overflow-y-auto py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                
                return (
                  <li key={item.path}>
                    <Link 
                      href={item.path}
                      onClick={window.innerWidth < 768 ? () => setSidebarOpen(false) : undefined}
                      className={`flex items-center py-3 px-4 text-sm ${
                        isActive 
                          ? 'bg-[#5f2995]/10 text-[#5f2995] dark:bg-[#5f2995]/20 dark:text-[#b98cd1] font-medium border-r-4 border-[#5f2995] dark:border-[#b98cd1]' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className={`transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'}`}>
                        {item.label}
                      </span>
                      {isActive && sidebarOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t dark:border-gray-800 mt-auto">
            <div className={`flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm ${sidebarOpen ? '' : 'justify-center'}`}>
              {sidebarOpen && <span>© 2025 Study Simple</span>}
              {mounted && (
                <button 
                  onClick={toggleTheme} 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Mobile header with toggle button */}
        <header className="md:hidden flex items-center px-4 py-2 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center mx-auto">
            <img src={logo.src} alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="font-semibold text-xl text-[#5f2995] dark:text-[#b98cd1]">
              Study Simple
            </h1>
          </div>
        </header>
        
        {/* Desktop open sidebar button - only shown when sidebar is collapsed on desktop */}
        {!sidebarOpen && clientWidth >= 768 && (
          <button
            onClick={toggleSidebar}
            className="fixed left-4 top-4 z-10 p-2 rounded-md bg-[#5f2995] text-white hover:bg-[#8655ac] shadow-md transition-all duration-300"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        
        {/* Page content */}
        <main className="flex-grow overflow-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}