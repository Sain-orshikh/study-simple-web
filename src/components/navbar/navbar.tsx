"use client";

import Link from "next/link"
import logo from "@/assets/logo.png"
import { IoSearch } from "react-icons/io5"
import Menu from "@/components/navbar/menu"
import { useState } from "react"

export function Navbar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch)
  }

  return (
    <header className="flex flex-col md:flex-row mb-8 border shadow-sm">
      <div className="flex items-center justify-between py-2 px-4 w-full">
        {/* Logo and Site Name */}
        <Link href="/" className="flex items-center space-x-2">
          <img src={logo.src} alt="Logo" className="h-10 w-10" />
          <span className="font-semibold text-xl">Study Simple</span>
        </Link>

        {/* Desktop Navigation and Search - Right Aligned */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-row items-center">
            <div className="h-8 border-l p-1 hover:bg-gray-100 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
              <IoSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-48 h-8 border border-gray-500 rounded-r-md pl-2 focus:outline-none"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button 
            onClick={toggleMobileSearch}
            className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full"
          >
            <IoSearch size={22} />
          </button>
          
          {/* Menu (Always Visible) */}
          <Menu />
        </div>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex flex-row items-center w-full">
            <div className="h-8 border-l p-1 hover:bg-gray-100 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
              <IoSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-8 border border-gray-500 rounded-r-md pl-2 focus:outline-none"
            />
          </div>
        </div>
      )}
    </header>
  )
}

