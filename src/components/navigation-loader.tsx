"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { navigationLoadingState } from "./themeatom"

export default function NavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [globalLoading] = useAtom(navigationLoadingState)
  
  useEffect(() => {
    // Create a URL instance to track for changes
    const url = pathname + searchParams.toString()
    
    // Start loading
    setIsLoading(true)
    
    // Setup a timer to stop the loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Slightly longer timeout for the animation to be visible
    
    return () => clearTimeout(timer)
  }, [pathname, searchParams])
  
  // Use either the route-based loading state or the global one triggered by link clicks
  const showLoader = isLoading || globalLoading
  
  return (
    <>
      {/* Progress bar at the top */}
      <AnimatePresence>
        {showLoader && (
          <motion.div 
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full bg-[#5f2995]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}