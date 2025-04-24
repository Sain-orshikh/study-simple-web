import { Card } from "@/components/ui/card"
import { 
  ClockIcon, 
  CalendarIcon, 
  AlertCircleIcon 
} from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"
import Image from "next/image"
import Link from "next/link"

export default function SchoolClubsPage() {
  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <main className="text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 mb-8">
                <div className="absolute inset-0 bg-purple-100 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarIcon className="h-32 w-32 text-purple-600" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">School Clubs</h1>
              
              <Card className="p-8 mb-8 border-2 border-amber-200 bg-amber-50 max-w-2xl">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircleIcon className="h-8 w-8 text-amber-500 mr-2" />
                  <h2 className="text-2xl font-semibold text-amber-700">Clubs Currently Closed</h2>
                </div>
                
                <p className="text-lg mb-6 text-gray-700">
                  Our clubs program is currently closed for the season. We'll be back in autumn with exciting new club opportunities!
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
                  <ClockIcon className="h-5 w-5" />
                  <p>Expected return: September 2025</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                  <h3 className="font-medium mb-2 text-gray-900">While you wait:</h3>
                  <ul className="text-left list-disc pl-5 space-y-2 text-gray-700">
                    <li>Check out our <Link href="/study-tools" className="text-blue-600 hover:underline">study tools</Link></li>
                    <li>Browse <Link href="/events" className="text-blue-600 hover:underline">upcoming events</Link></li>
                    <li>Visit the <Link href="/market" className="text-blue-600 hover:underline">marketplace</Link></li>
                  </ul>
                </div>
              </Card>
              
              <div className="text-sm text-gray-500">
                <p>For urgent club-related inquiries, please contact the student activities office.</p>
              </div>
            </div>
          </main>
        </div>
      </Sidebar>
    </>
  )
}

