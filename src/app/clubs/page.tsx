import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  BookOpenIcon,
  MusicIcon,
  PaletteIcon,
  CodeIcon,
  GlobeIcon,
  CameraIcon,
} from "lucide-react"

export default function ClubsPage() {
  const clubs = [
    {
      id: 1,
      name: "Book Club",
      description: "Join us to discuss interesting books and share your thoughts with fellow book lovers.",
      icon: <BookOpenIcon className="h-6 w-6 text-blue-600" />,
      meetingDay: "Tuesdays",
      meetingTime: "4:00 PM - 5:30 PM",
      location: "Library, Room 102",
      members: 24,
    },
    {
      id: 2,
      name: "Music Club",
      description: "For students interested in playing instruments, singing, or music production.",
      icon: <MusicIcon className="h-6 w-6 text-purple-600" />,
      meetingDay: "Mondays & Wednesdays",
      meetingTime: "3:30 PM - 5:00 PM",
      location: "Music Room",
      members: 32,
    },
    {
      id: 3,
      name: "Art Club",
      description: "Express your creativity through various art forms including painting, drawing, and sculpture.",
      icon: <PaletteIcon className="h-6 w-6 text-yellow-600" />,
      meetingDay: "Fridays",
      meetingTime: "3:30 PM - 5:00 PM",
      location: "Art Room",
      members: 18,
    },
    {
      id: 4,
      name: "Coding Club",
      description: "Learn programming languages, work on coding projects, and participate in hackathons.",
      icon: <CodeIcon className="h-6 w-6 text-green-600" />,
      meetingDay: "Thursdays",
      meetingTime: "4:00 PM - 5:30 PM",
      location: "Computer Lab 2",
      members: 27,
    },
    {
      id: 5,
      name: "International Club",
      description: "Celebrate cultural diversity, learn about different countries, and organize cultural events.",
      icon: <GlobeIcon className="h-6 w-6 text-red-600" />,
      meetingDay: "Every other Wednesday",
      meetingTime: "3:30 PM - 4:30 PM",
      location: "Room 203",
      members: 22,
    },
    {
      id: 6,
      name: "Photography Club",
      description: "Learn photography techniques, go on photo walks, and showcase your work in exhibitions.",
      icon: <CameraIcon className="h-6 w-6 text-indigo-600" />,
      meetingDay: "Tuesdays",
      meetingTime: "4:00 PM - 5:00 PM",
      location: "Room 210",
      members: 15,
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Clubs</h1>

          <p className="text-lg mb-6">
            Explore the various clubs and extracurricular activities available. Joining a club is a great way to pursue
            your interests, develop new skills, and make friends!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {clubs.map((club) => (
              <Card key={club.id} className="p-6">
                <div className="flex items-center mb-4">
                  {club.icon}
                  <h2 className="text-xl font-semibold ml-2">{club.name}</h2>
                </div>

                <p className="text-gray-600 mb-4">{club.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.meetingDay}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.meetingTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.members} members</span>
                  </div>
                </div>

                <Button size="sm">Join Club</Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Start a New Club</h2>
            <p className="mb-4">
              Have an idea for a club that doesn&apos;t exist yet? You can propose a new club by following these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Find a faculty advisor willing to sponsor the club</li>
              <li>Gather at least 5 interested students</li>
              <li>Complete the club proposal form</li>
              <li>Submit your proposal to the Student Activities Coordinator</li>
            </ol>
            <Button>Get Club Proposal Form</Button>
          </div>
        </main>
      </div>
    </>
  )
}

