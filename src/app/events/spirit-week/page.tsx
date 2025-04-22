import { Card } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

export default function SpiritWeekPage() {
  return (
    <>
    <Sidebar>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <main>
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">🐵</span>
          <h1 className="text-3xl font-bold">Spirit Week</h1>
          <CalendarIcon className="h-6 w-6 ml-2 text-red-500" />
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Event Overview</h2>
          <p className="mb-4">
            Get ready for a week full of school spirit and fun activities! Spirit Week is a time for our school
            community to come together, show our pride, and create lasting memories.
          </p>
          <p>
            <strong>Dates:</strong> October 16-20, 2023
          </p>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Daily Themes</h2>
        <div className="grid gap-4">
          <Card className="p-4 border-l-4 border-red-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Monday: Pajama Day</h3>
                <p className="text-gray-600">Roll out of bed and come to school in your comfiest PJs!</p>
              </div>
              <span className="text-2xl">😴</span>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Tuesday: Twin Day</h3>
                <p className="text-gray-600">Find a friend and dress identically!</p>
              </div>
              <span className="text-2xl">👯</span>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Wednesday: Wacky Wednesday</h3>
                <p className="text-gray-600">Crazy hair, mismatched clothes, and backwards outfits!</p>
              </div>
              <span className="text-2xl">🤪</span>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Thursday: Throwback Thursday</h3>
                <p className="text-gray-600">Dress from your favorite decade!</p>
              </div>
              <span className="text-2xl">🕰️</span>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Friday: School Colors Day</h3>
                <p className="text-gray-600">Show your school pride by wearing our colors!</p>
              </div>
              <span className="text-2xl">🎉</span>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Special Activities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lunchtime games in the courtyard</li>
            <li>Photo booth available during lunch periods</li>
            <li>Spirit points competition between classes</li>
            <li>Pep rally on Friday afternoon</li>
            <li>Special treats in the cafeteria each day</li>
          </ul>
        </div>
      </main>
    </div>
    </Sidebar>
    </>
  )
}

