import Sidebar from "@/components/sidebar/sidebar"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CalendarIcon, LaptopIcon, LightbulbIcon, MusicIcon } from "lucide-react"

export default function Blog() {
  return (
    <>
      <Sidebar>
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <main className="space-y-8">
          <aside className="border-l-4 border-gray-300 pl-4 py-4">
            <p className="italic">
              <span className="text-yellow-500 mr-2">●</span>
              <em>
                If you&apos;re seeking a tutor for your subjects,{" "}
                <Link href="/tutors" className="text-blue-600 hover:underline">
                  click here!
                </Link>
              </em>
            </p>
          </aside>

          <div className="border-l-4 border-gray-300 pl-4 py-4">
            <p className="flex items-center">
              <LightbulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Little tip: Always refresh before using it to see the updates.</span>
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">📱</span>
              What&apos;s new? <span className="ml-2">📰</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/events/talent-show" className="flex items-center">
                  <MusicIcon className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="font-medium">Talent show 2023</span>
                  <span className="ml-2">💃</span>
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/events/spirit-week" className="flex items-center">
                  <span className="mr-2">🐵</span>
                  <span className="font-medium">Spirit week</span>
                  <CalendarIcon className="h-5 w-5 ml-2 text-red-500" />
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/school-clubs" className="flex items-center">
                  <span className="mr-2">🏫</span>
                  <span className="font-medium">School Clubs</span>
                  <span className="ml-2">♣️</span>
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/dea" className="flex items-center">
                  <span className="mr-2">🏃</span>
                  <span className="font-medium">DEA</span>
                  <span className="ml-2">🎸</span>
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/events/hackathon" className="flex items-center">
                  <LaptopIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Hackathon 2023</span>
                  <span className="ml-2">💬</span>
                </Link>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:-translate-y-1">
                <Link href="/blogs" className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">📝</span>
                    <span className="font-medium">All Blogs</span>
                  </div>
                  <span className="text-blue-500 text-sm">View all →</span>
                </Link>
              </Card>
            </div>
          </section>
        </main>
      </div>
      </Sidebar>
    </>
  )
}