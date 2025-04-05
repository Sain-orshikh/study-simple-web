import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ClockIcon,
  CalendarIcon,
  ListTodoIcon,
  BookOpenIcon,
  CalculatorIcon,
  BrainIcon,
  PencilIcon,
  TimerIcon,
} from "lucide-react"

export default function StudyToolsPage() {
  const tools = [
    {
      id: 1,
      name: "Pomodoro Timer",
      description: "Stay focused with timed study sessions and breaks.",
      icon: <TimerIcon className="h-10 w-10 text-red-500" />,
      link: "/study-tools/pomodoro",
    },
    {
      id: 2,
      name: "Study Planner",
      description: "Create and manage your study schedule effectively.",
      icon: <CalendarIcon className="h-10 w-10 text-blue-500" />,
      link: "/study-tools/planner",
    },
    {
      id: 3,
      name: "Flashcards",
      description: "Create digital flashcards for effective memorization.",
      icon: <BookOpenIcon className="h-10 w-10 text-green-500" />,
      link: "/study-tools/flashcards",
    },
    {
      id: 4,
      name: "Note Taking",
      description: "Take organized notes with our digital note-taking tool.",
      icon: <PencilIcon className="h-10 w-10 text-purple-500" />,
      link: "/study-tools/notes",
    },
    {
      id: 5,
      name: "Calculator",
      description: "Scientific calculator for math and science problems.",
      icon: <CalculatorIcon className="h-10 w-10 text-gray-500" />,
      link: "/study-tools/calculator",
    },
    {
      id: 6,
      name: "To-Do List",
      description: "Keep track of assignments and tasks with due dates.",
      icon: <ListTodoIcon className="h-10 w-10 text-yellow-500" />,
      link: "/study-tools/todo",
    },
    {
      id: 7,
      name: "Focus Music",
      description: "Curated playlists to enhance concentration while studying.",
      icon: <BrainIcon className="h-10 w-10 text-pink-500" />,
      link: "/study-tools/music",
    },
    {
      id: 8,
      name: "Citation Generator",
      description: "Generate citations in various formats for your papers.",
      icon: <ClockIcon className="h-10 w-10 text-orange-500" />,
      link: "/study-tools/citations",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Study Tools</h1>

          <p className="text-lg mb-6">
            Enhance your study sessions with these helpful tools designed to improve productivity, organization, and
            learning efficiency.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{tool.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Button asChild className="mt-auto">
                  <Link href={tool.link}>Use Tool</Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Suggest a Tool</h2>
            <p className="mb-4">
              Have an idea for a study tool that would be helpful? Let us know, and we might add it to our collection!
            </p>
            <Button variant="outline">Submit Suggestion</Button>
          </div>
        </main>
      </div>
    </>
  )
}

