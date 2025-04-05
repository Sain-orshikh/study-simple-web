import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlayCircleIcon, ClockIcon, CalendarIcon } from "lucide-react"

export default function PodcastsPage() {
  const podcasts = [
    {
      id: 1,
      title: "Effective Study Habits",
      description:
        "Learn about research-backed study techniques that can help you retain information better and study more efficiently.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "32 min",
      date: "May 10, 2023",
      episode: "Episode 1",
    },
    {
      id: 2,
      title: "Overcoming Procrastination",
      description: "Strategies to beat procrastination and develop better time management skills for academic success.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "28 min",
      date: "May 17, 2023",
      episode: "Episode 2",
    },
    {
      id: 3,
      title: "Stress Management for Students",
      description:
        "Tips and techniques for managing academic stress and maintaining mental well-being during exam periods.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "35 min",
      date: "May 24, 2023",
      episode: "Episode 3",
    },
    {
      id: 4,
      title: "Note-Taking Strategies",
      description: "Explore different note-taking methods and find the one that works best for your learning style.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "30 min",
      date: "May 31, 2023",
      episode: "Episode 4",
    },
    {
      id: 5,
      title: "Memory Techniques",
      description: "Discover mnemonic devices and other memory techniques to help you remember complex information.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "27 min",
      date: "June 7, 2023",
      episode: "Episode 5",
    },
    {
      id: 6,
      title: "Balancing Academics and Social Life",
      description:
        "How to maintain a healthy balance between your studies and social activities for overall well-being.",
      image: "/placeholder.svg?height=200&width=200",
      duration: "33 min",
      date: "June 14, 2023",
      episode: "Episode 6",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Study Simple Podcasts</h1>

          <p className="text-lg mb-6">
            Listen to our educational podcasts covering various topics related to studying, productivity, and academic
            success.
          </p>

          <div className="grid gap-6">
            {podcasts.map((podcast) => (
              <Card key={podcast.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={podcast.image || "/placeholder.svg"}
                      alt={podcast.title}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-blue-600">{podcast.episode}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2">{podcast.title}</h2>
                      <p className="text-gray-600 mb-4">{podcast.description}</p>
                      <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {podcast.duration}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {podcast.date}
                        </div>
                      </div>
                    </div>
                    <Button className="flex items-center gap-2 w-fit">
                      <PlayCircleIcon className="h-5 w-5" />
                      Listen Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Subscribe to Our Podcast</h2>
            <p className="mb-4">Never miss an episode! Subscribe to our podcast on your favorite platform.</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Spotify</Button>
              <Button variant="outline">Apple Podcasts</Button>
              <Button variant="outline">Google Podcasts</Button>
              <Button variant="outline">RSS Feed</Button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

