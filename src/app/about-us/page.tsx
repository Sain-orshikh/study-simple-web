import Sidebar from "@/components/sidebar/sidebar"
import { Card } from "@/components/ui/card"
import { 
  ConstructionIcon, 
  InfoIcon, 
  AlertCircleIcon
} from "lucide-react"
import Link from "next/link"

export default function AboutUsPage() {
  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <main className="text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 mb-8">
                <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <InfoIcon className="h-32 w-32 text-amber-600" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              
              <Card className="p-8 mb-8 border-2 border-amber-200 bg-amber-50 max-w-2xl">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircleIcon className="h-8 w-8 text-amber-500 mr-2" />
                  <h2 className="text-2xl font-semibold text-amber-700">Page On Hold</h2>
                </div>
                
                <p className="text-lg mb-6 text-gray-700">
                  Work on the About Us page is currently on hold. We plan to resume development next year to provide you with more information about our mission, values, and the team behind this platform.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
                  <ConstructionIcon className="h-5 w-5" />
                  <p>Expected completion: October 2025</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                  <h3 className="font-medium mb-2 text-gray-900">In the meantime:</h3>
                  <ul className="text-left list-disc pl-5 space-y-2 text-gray-700">
                    <li>Explore our <Link href="/study-tools" className="text-amber-600 hover:underline">study resources</Link></li>
                    <li>Check out recent <Link href="/blogs" className="text-amber-600 hover:underline">educational articles</Link></li>
                    <li>Join upcoming <Link href="/events" className="text-amber-600 hover:underline">educational events</Link></li>
                  </ul>
                </div>
              </Card>
              
              <div className="text-sm text-gray-500">
                <p>Have questions? Feel free to contact us through our <Link href="/support" className="text-amber-600 hover:underline">support page</Link>.</p>
              </div>
            </div>
          </main>
        </div>
      </Sidebar>
    </>
  )
}

