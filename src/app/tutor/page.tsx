import { Card } from "@/components/ui/card"
import { 
  ClockIcon, 
  BookOpenIcon, 
  AlertCircleIcon 
} from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"
import Link from "next/link"

export default function TutorPage() {
  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <main className="text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 mb-8">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpenIcon className="h-32 w-32 text-blue-600" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Tutor Services</h1>
              
              <Card className="p-8 mb-8 border-2 border-blue-200 bg-blue-50 max-w-2xl">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircleIcon className="h-8 w-8 text-blue-500 mr-2" />
                  <h2 className="text-2xl font-semibold text-blue-700">Tutoring Services Closed</h2>
                </div>
                
                <p className="text-lg mb-6 text-gray-700">
                  Our tutoring program is currently closed for the school year break. We'll be back in the next school year with more tutors ready to help you succeed!
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
                  <ClockIcon className="h-5 w-5" />
                  <p>Expected return: September 2025</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                  <h3 className="font-medium mb-2 text-gray-900">While you wait:</h3>
                  <ul className="text-left list-disc pl-5 space-y-2 text-gray-700">
                    <li>Check out our <Link href="/study-tools" className="text-blue-600 hover:underline">study tools</Link></li>
                    <li>Browse <Link href="/blogs" className="text-blue-600 hover:underline">educational blogs</Link></li>
                    <li>View <Link href="/application-tips" className="text-blue-600 hover:underline">application guides</Link></li>
                  </ul>
                </div>
              </Card>
              
              <div className="text-sm text-gray-500">
                <p>If you need immediate academic assistance, please contact your academic advisor.</p>
              </div>
            </div>
          </main>
        </div>
      </Sidebar>
    </>
  )
}

