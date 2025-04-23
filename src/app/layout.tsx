"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <html lang="en" className="light">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Simple script to log scroll events
            window.addEventListener('scroll', function() {
              console.log('SCROLL DETECTED at ' + new Date().toISOString());
            });
          `
        }} />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

