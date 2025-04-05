import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpenIcon,
  CodeIcon,
  MusicIcon,
  PaletteIcon,
  GlobeIcon,
  HeartIcon,
  CameraIcon,
  UsersIcon,
} from "lucide-react"
import { Navbar } from "@/components/navbar/navbar"

export default function SchoolClubsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main>
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-2">🏫</span>
            <h1 className="text-3xl font-bold">School Clubs</h1>
            <span className="ml-2 text-2xl">♣️</span>
          </div>

          <div className="mb-8">
            <p className="text-lg">
              Explore the various clubs and extracurricular activities available at our school. Joining a club is a great
              way to pursue your interests, develop new skills, and make friends!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-6 w-6 mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold">Book Club</h2>
              </div>
              <p className="mb-4">
                For students who love reading and discussing literature. We read a variety of genres and meet weekly to
                share our thoughts.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Tuesdays, 3:30 PM - 4:30 PM in the Library</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CodeIcon className="h-6 w-6 mr-2 text-green-600" />
                <h2 className="text-xl font-semibold">Coding Club</h2>
              </div>
              <p className="mb-4">
                Learn programming languages, work on coding projects, and participate in hackathons and competitions.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Thursdays, 3:30 PM - 5:00 PM in Computer Lab 2</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MusicIcon className="h-6 w-6 mr-2 text-purple-600" />
                <h2 className="text-xl font-semibold">Music Club</h2>
              </div>
              <p className="mb-4">
                For students interested in playing instruments, singing, or music production. We organize performances
                throughout the year.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Meeting: Mondays and Wednesdays, 4:00 PM - 5:30 PM in the Music Room
              </p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <PaletteIcon className="h-6 w-6 mr-2 text-yellow-600" />
                <h2 className="text-xl font-semibold">Art Club</h2>
              </div>
              <p className="mb-4">
                Express your creativity through various art forms including painting, drawing, sculpture, and digital art.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Fridays, 3:30 PM - 5:00 PM in Art Room</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <GlobeIcon className="h-6 w-6 mr-2 text-red-600" />
                <h2 className="text-xl font-semibold">International Club</h2>
              </div>
              <p className="mb-4">
                Celebrate cultural diversity, learn about different countries, and organize international food festivals.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Every other Wednesday, 3:30 PM - 4:30 PM in Room 203</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <HeartIcon className="h-6 w-6 mr-2 text-pink-600" />
                <h2 className="text-xl font-semibold">Volunteer Club</h2>
              </div>
              <p className="mb-4">
                Engage in community service projects and make a positive impact in our local community.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Every other Monday, 3:30 PM - 4:30 PM in Room 105</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CameraIcon className="h-6 w-6 mr-2 text-indigo-600" />
                <h2 className="text-xl font-semibold">Photography Club</h2>
              </div>
              <p className="mb-4">
                Learn photography techniques, go on photo walks, and showcase your work in school exhibitions.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Tuesdays, 4:00 PM - 5:00 PM in Room 210</p>
              <Button size="sm">Join Club</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <UsersIcon className="h-6 w-6 mr-2 text-orange-600" />
                <h2 className="text-xl font-semibold">Debate Club</h2>
              </div>
              <p className="mb-4">
                Develop public speaking skills, critical thinking, and participate in debate competitions.
              </p>
              <p className="text-sm text-gray-600 mb-4">Meeting: Wednesdays, 3:30 PM - 5:00 PM in Room 301</p>
              <Button size="sm">Join Club</Button>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Starting a New Club</h2>
            <p className="mb-4">
              Have an idea for a club that doesn&apos;t exist yet? You can propose a new club by following these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Find a faculty advisor willing to sponsor the club</li>
              <li>Gather at least 5 interested students</li>
              <li>Complete the club proposal form (available in the main office)</li>
              <li>Submit your proposal to the Student Activities Coordinator</li>
            </ol>
            <Button className="mt-4">Download Club Proposal Form</Button>
          </div>
        </main>
      </div>
    </>
  )
}

