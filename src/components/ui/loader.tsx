"use client"

import React from "react"
import { motion } from "framer-motion"

interface LoaderProps {
  size?: "small" | "medium" | "large"
  color?: string
  fullScreen?: boolean
  text?: string
}

export default function Loader({
  size = "medium",
  color = "#5f2995",
  fullScreen = false,
  text
}: LoaderProps) {
  // Size values in pixels
  const sizeValues = {
    small: 24,
    medium: 40,
    large: 64
  }
  
  const actualSize = sizeValues[size]
  
  // Spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: "linear"
      }
    }
  }
  
  // Pulse animation for the text
  const pulseVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut"
      }
    }
  }
  
  const loader = (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="rounded-full border-t-transparent"
        style={{
          width: actualSize,
          height: actualSize,
          borderWidth: Math.max(3, actualSize / 10),
          borderColor: color,
          borderTopColor: 'transparent'
        }}
        variants={spinnerVariants}
        animate="animate"
      />
      
      {text && (
        <motion.p 
          className="mt-4 text-center font-medium"
          style={{ color }}
          variants={pulseVariants}
          animate="animate"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
        {loader}
      </div>
    )
  }
  
  return loader
}