"use client"

import Link from "next/link"
import { 
  BookOpenIcon, 
  MapPinIcon, 
  HeartIcon 
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 border-t">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-6 w-6 text-[#5f2995]" />
              <h3 className="text-xl font-bold">Study Simple</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your one-stop resource for academic success and community engagement.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Study Simple. All rights reserved.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/studies" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/market" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/school-clubs" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  School Clubs
                </Link>
              </li>
              <li>
                <Link href="/tutor" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link href="/application-tips" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Application Tips
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blogs" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Student Blogs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/study-tools" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Study Tools
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="text-gray-600 hover:text-[#5f2995] text-sm">
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Get in Touch</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <a href="mailto:mongolaspirationmun@gmail.com" className="flex items-center space-x-2 hover:text-[#5f2995]">
                  <svg className="h-4 w-4 text-[#5f2995]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                  </svg>
                  <span>mongolaspirationmun@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center mt-4 space-x-2 text-gray-600 text-sm">
                <MapPinIcon className="h-4 w-4 text-[#5f2995]" />
                <span>Ulaanbaatar, Mongolia</span>
              </li>
            </ul>
            <div className="flex space-x-4 pt-0">
              <a href="https://www.instagram.com/mais_study_simple/" 
                 className="flex items-center gap-2 text-gray-600 hover:text-[#5f2995] transition-colors duration-200"
                 aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">mais_study_simple</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Made with <HeartIcon className="inline-block h-4 w-4 text-[#ead36b]" /> for students, by students | Last updated: April 28, 2025
          </p>
        </div>
      </div>
    </footer>
  )
}