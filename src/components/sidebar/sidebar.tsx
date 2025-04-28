"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useAtom } from "jotai"
import { 
  sidebarOpenState, 
  setSidebarOpen, 
  sidebarHoverState, 
  setSidebarHover, 
  effectiveSidebarState,
  navigationLoadingState,
  setNavigationLoading
} from "@/components/themeatom"
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
  ChevronLeft,
  Calendar,
  GraduationCap
} from 'lucide-react'
import logo from "@/assets/logo.png"
import NavigationLoader from "../navigation-loader"

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpenValue] = useAtom(sidebarOpenState)
  const [isHovering, setIsHovering] = useAtom(sidebarHoverState)
  const [effectiveOpen] = useAtom(effectiveSidebarState)
  const [, setIsNavigating] = useAtom(setNavigationLoading)
  const [clientWidth, setClientWidth] = useState(0)
  
  // Handle window resize
  useEffect(() => {
    const updateClientWidth = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        setClientWidth(width)
        
        // On mobile devices, always close sidebar
        if (width < 768) {
          setSidebarOpenValue(false)
          setIsHovering(false)
        }
      }
    }
    
    // Set mounted state
    setMounted(true)
    
    // Initial setup
    updateClientWidth()
    
    // Listen for resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateClientWidth)
      return () => window.removeEventListener('resize', updateClientWidth)
    }
  }, [setSidebarOpenValue, setIsHovering])

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/blogs', label: 'Blogs', icon: <Newspaper className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/studies', label: 'Studies', icon: <BookOpen className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/study-tools', label: 'Study Tools', icon: <Brain className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/events', label: 'Events', icon: <Calendar className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/tutor', label: 'Tutors', icon: <GraduationCap className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/about-us', label: 'About Us', icon: <Users className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/school-clubs', label: 'School Clubs', icon: <BookMarked className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/podcasts', label: 'Podcasts', icon: <Podcast className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/application-tips', label: 'Application Tips', icon: <Lightbulb className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/market', label: 'Market', icon: <Store className='w-5 h-5 text-neutral-600 dark:text-neutral-300' /> },
  ]

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpenValue(!sidebarOpen)
  }

  // Handle mouse enter for hover functionality - ONLY for navigation section
  const handleNavMouseEnter = () => {
    // Only trigger hover effect on desktop and when sidebar is closed
    if (clientWidth >= 768 && !sidebarOpen) {
      setIsHovering(true)
    }
  }

  // Handle mouse leave for hover functionality
  const handleNavMouseLeave = () => {
    setIsHovering(false)
  }

  // Handle link click with custom navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault() // Prevent default navigation
    
    // Display loading state immediately
    setIsNavigating(true)
    
    // Close sidebar on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpenValue(false)
    }
    
    // Use setTimeout to create a small delay before navigation
    // This ensures the loader is visible before the potential lag
    setTimeout(() => {
      router.push(path)
      
      // Reset loader after navigation starts
      setTimeout(() => {
        setIsNavigating(false)
      }, 800) // This value should match the duration in NavigationLoader
    }, 50) // Small delay to ensure loader appears first
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation progress indicator */}
      <NavigationLoader />
      
      {/* Mobile sidebar overlay */}
      {effectiveOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={() => setSidebarOpenValue(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm z-20 transition-all duration-300 ${
          effectiveOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Sidebar Header with Close Button */}
          <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
            <div className={`flex items-center transition-opacity duration-200 ${effectiveOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <img src={logo.src} alt="Logo" className="h-8 w-8 mr-2" />
              <h2 className={`text-lg font-semibold text-[#5f2995] dark:text-[#b98cd1] whitespace-nowrap ${effectiveOpen ? '' : 'hidden md:hidden'}`}>
                Study Simple
              </h2>
            </div>
            
            {/* Close sidebar button - only visible on desktop when sidebar is open by toggle, not by hover */}
            <button 
              onClick={toggleSidebar}
              className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-opacity duration-300 md:block ${
                effectiveOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
              }`}
              aria-label="Close sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          
          {/* Navigation Links - Added onMouseEnter/onMouseLeave here */}
          <nav 
            className="flex-grow overflow-y-auto py-4"
            onMouseEnter={handleNavMouseEnter}
            onMouseLeave={handleNavMouseLeave}
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                
                return (
                  <li key={item.path}>
                    <a 
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex items-center ${!effectiveOpen ? `justify-center` : ``} py-3 px-4 text-sm ${
                        isActive 
                          ? 'bg-[#5f2995]/10 text-[#5f2995] dark:bg-[#5f2995]/20 dark:text-[#b98cd1] font-medium border-r-4 border-[#5f2995] dark:border-[#b98cd1]' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      title={!effectiveOpen ? item.label : undefined}
                    >
                      <span className={`${effectiveOpen ? `mr-3` : `mr-0`}`}>{item.icon}</span>
                      <span className={`transition-opacity duration-200 ${effectiveOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'}`}>
                        {item.label}
                      </span>
                      {isActive && effectiveOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t dark:border-gray-800 mt-auto">
            <div className={`flex flex-col mx-auto gap-2 text-gray-500 dark:text-gray-400 text-sm ${effectiveOpen ? 'flex-row justify-between' : 'justify-center'}`}>
              {/* Toggle sidebar button - only visible when sidebar is closed on desktop */}
              {!effectiveOpen && (
                <button 
                  onClick={toggleSidebar}
                  className="p-2 mx-auto rounded-md bg-[#5f2995] text-white hover:bg-[#8655ac] shadow-sm transition-all duration-300"
                  aria-label="Open sidebar"
                >
                  <ChevronRight size={18} />
                </button>
              )}
              
              {effectiveOpen && <span>© 2025 Study Simple</span>}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {/* Mobile header with toggle button */}
        <header className="md:hidden flex items-center px-4 py-2 border-b dark:border-gray-800 bg-white dark:bg-gray-900 transition-opacity duration-500">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={effectiveOpen ? "Close sidebar" : "Open sidebar"}
          >
            {effectiveOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center mx-auto">
            <img src={logo.src} alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="font-semibold text-xl text-[#5f2995] dark:text-[#b98cd1]">
              Study Simple
            </h1>
          </div>
        </header>
        
        {/* Page content */}
        <main 
          className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          {children}
        </main>
      </div>
    </div>
  )
}