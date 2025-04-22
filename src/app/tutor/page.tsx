import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar/sidebar"

export default function TutorsPage() {
  return (
    <>
      <Sidebar>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main>
          <h1 className="text-3xl font-bold mb-6">Find a Tutor</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Request a Tutor</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What subject do you need help with?" />
                </div>

                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea id="message" placeholder="Tell us more about what you need help with" />
                </div>

                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Available Subjects</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Mathematics
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sciences (Physics, Chemistry, Biology)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  English & Literature
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  History & Social Studies
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Foreign Languages
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Computer Science
                </li>
              </ul>

              <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Why Choose Our Tutors?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Experienced and qualified in their subjects</li>
                  <li>Flexible scheduling options</li>
                  <li>Personalized learning plans</li>
                  <li>Regular progress reports</li>
                  <li>Affordable rates</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      </Sidebar>
    </>
  )
}

