import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpenIcon, FileTextIcon, GraduationCapIcon } from "lucide-react"

export default function StudiesPage() {
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "Calculus Notes", type: "PDF" },
        { name: "Algebra Practice Problems", type: "PDF" },
        { name: "Statistics Cheat Sheet", type: "PDF" },
      ],
    },
    {
      id: 2,
      name: "Physics",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "Mechanics Formulas", type: "PDF" },
        { name: "Electricity & Magnetism Notes", type: "PDF" },
        { name: "Thermodynamics Summary", type: "PDF" },
      ],
    },
    {
      id: 3,
      name: "Chemistry",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "Periodic Table Guide", type: "PDF" },
        { name: "Organic Chemistry Reactions", type: "PDF" },
        { name: "Lab Safety Procedures", type: "PDF" },
      ],
    },
    {
      id: 4,
      name: "Biology",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "Cell Structure Notes", type: "PDF" },
        { name: "Genetics Study Guide", type: "PDF" },
        { name: "Ecology Concepts", type: "PDF" },
      ],
    },
    {
      id: 5,
      name: "Computer Science",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "Programming Fundamentals", type: "PDF" },
        { name: "Data Structures & Algorithms", type: "PDF" },
        { name: "Web Development Basics", type: "PDF" },
      ],
    },
    {
      id: 6,
      name: "History",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      resources: [
        { name: "World History Timeline", type: "PDF" },
        { name: "Ancient Civilizations Notes", type: "PDF" },
        { name: "Modern History Events", type: "PDF" },
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Studies</h1>

          <p className="text-lg mb-6">
            Access study materials and resources for various subjects. These materials are created and curated by our team
            to help you excel in your academic journey.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="p-6">
                <div className="flex items-center mb-4">
                  {subject.icon}
                  <h2 className="text-xl font-semibold ml-2">{subject.name}</h2>
                </div>

                <ul className="space-y-3 mb-4">
                  {subject.resources.map((resource, index) => (
                    <li key={index} className="flex items-center">
                      <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{resource.name}</span>
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
                    </li>
                  ))}
                </ul>

                <Button size="sm" className="w-full">
                  View All Resources
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Request Study Materials
            </h2>
            <p className="mb-4">
              Don&apos;t see the study materials you need? Request specific resources and our team will work on creating or
              finding them for you.
            </p>
            <Button>Submit Request</Button>
          </div>
        </main>
      </div>
    </>
  )
}

