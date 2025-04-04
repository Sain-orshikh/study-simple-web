import Link from "next/link"
import { Card } from "@/components/ui/card"
import { LightbulbIcon, CalendarIcon, MusicIcon, LaptopIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Navbar currentPath="/" />

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

          <div className="space-y-4">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <Link href="/events/talent-show" className="flex items-center">
                <MusicIcon className="h-5 w-5 mr-2" />
                <span>Talent show 2023</span>
                <span className="ml-2">💃</span>
              </Link>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <Link href="/events/spirit-week" className="flex items-center">
                <span className="mr-2">🐵</span>
                <span>Spirit week</span>
                <CalendarIcon className="h-5 w-5 ml-2 text-red-500" />
              </Link>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <Link href="/school-clubs" className="flex items-center">
                <span className="mr-2">🏫</span>
                <span>School Clubs</span>
                <span className="ml-2">♣️</span>
              </Link>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <Link href="/dea" className="flex items-center">
                <span className="mr-2">🏃</span>
                <span>DEA</span>
                <span className="ml-2">🎸</span>
              </Link>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <Link href="/events/hackathon" className="flex items-center">
                <LaptopIcon className="h-5 w-5 mr-2" />
                <span>Hackathon 2023</span>
                <span className="ml-2">💬</span>
              </Link>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

