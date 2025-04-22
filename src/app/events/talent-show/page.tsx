import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MusicIcon } from "lucide-react"
import Sidebar from "@/components/sidebar/sidebar"

export default function TalentShowPage() {
  return (
    <>
    <Sidebar>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <main>
        <div className="flex items-center mb-6">
          <MusicIcon className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">Talent Show 2023</h1>
          <span className="ml-2 text-2xl">💃</span>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
            <p>
              <strong>Date:</strong> December 15, 2023
            </p>
            <p>
              <strong>Time:</strong> 6:00 PM - 9:00 PM
            </p>
            <p>
              <strong>Location:</strong> School Auditorium
            </p>
            <p>
              <strong>Description:</strong> Join us for an evening of amazing performances showcasing the incredible
              talents of our students! From singing and dancing to magic tricks and comedy, this year&apos;s talent show
              promises to be an unforgettable event.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Participant Information</h2>
            <ul className="space-y-2">
              <li>Registration deadline: November 30, 2023</li>
              <li>Rehearsal: December 13, 2023</li>
              <li>Performance time limit: 5 minutes</li>
              <li>All participants must be current students</li>
            </ul>
            <Button className="mt-4">Register to Perform</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Audience Information</h2>
            <ul className="space-y-2">
              <li>Tickets: $5 for students, $8 for adults</li>
              <li>Doors open at 5:30 PM</li>
              <li>Refreshments will be available for purchase</li>
              <li>All proceeds go to the school&apos;s arts program</li>
            </ul>
            <Button className="mt-4">Purchase Tickets</Button>
          </Card>
        </div>
      </main>
    </div>
    </Sidebar>
    </>
  )
}

