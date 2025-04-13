"use client"
import Link from "next/link";
import { MdMenu } from "react-icons/md";

import React, {useState} from 'react'

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

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const Menu = () => {

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/blogs', label: 'Blogs', icon: <Newspaper className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/studies', label: 'Studies', icon: <BookOpen className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/study-tools', label: 'Study Tools', icon: <Brain className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/about-us', label: 'About Us', icon: <Users className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/clubs', label: 'Clubs', icon: <BookMarked className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/podcasts', label: 'Podcasts', icon: <Podcast className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/application-tips', label: 'Application Tips', icon: <Lightbulb className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/market', label: 'Market', icon: <Store className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
    { path: '/others', label: 'Others', icon: <MoreHorizontal className='h-full w-full text-neutral-600 dark:text-neutral-300' /> },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="relative">
        <button className={`flex items-center justify-center w-10 h-10 rounded-full hover:cursor-pointer transition duration-300 ${isOpen ? `rotate-90` : `rotate-0`}`} onClick={toggleMenu}>
          <MdMenu fontSize={35} />
        </button>
          {isOpen && (
            <div className="absolute top-13 right-0 w-fit-content bg-gray-50 shadow-lg z-20">
              <Dock className='items-end pb-3'>
                {navItems.map((item, idx) => (
                  <Link key={idx} href={item.path} passHref>
                  <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
                    <DockLabel>{item.label}</DockLabel>
                    <DockIcon>{item.icon}</DockIcon>
                  </DockItem>
                </Link>
                ))}
              </Dock>
            </div>
          )}
      </div>
    </>
  )
}

export default Menu