"use client"
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import React, { useState, useEffect, useRef } from 'react'

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
} from 'lucide-react';

const Menu = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/blogs', label: 'Blogs', icon: <Newspaper className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/studies', label: 'Studies', icon: <BookOpen className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/study-tools', label: 'Study Tools', icon: <Brain className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/about-us', label: 'About Us', icon: <Users className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/clubs', label: 'Clubs', icon: <BookMarked className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/podcasts', label: 'Podcasts', icon: <Podcast className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/application-tips', label: 'Application Tips', icon: <Lightbulb className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/market', label: 'Market', icon: <Store className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
    { path: '/others', label: 'Others', icon: <MoreHorizontal className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-300' /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when route changes (e.g., when a link is clicked)
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition duration-300 ${isOpen ? 'bg-gray-100' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <MdClose fontSize={28} /> : <MdMenu fontSize={28} />}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.path} 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-150"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;