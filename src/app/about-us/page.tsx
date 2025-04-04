import Image from "next/image"
import { Navbar } from "@/components/navbar"

export default function AboutUsPage() {
  const coordinators = [
    {
      id: 1,
      name: "Araljan Abal",
      image: "/placeholder.svg?height=150&width=150",
      role: "General Coordinator",
      description:
        'Greetings! I am the general coordinator of the Study Simple Club. For the academic year 2023-2024, I and other coordinators will try our best to make this community cooperative and inclusive. As the founder of this club, Nemuulen Togbaatar, said, "We do not want anyone to repeat our mistakes, so do not struggle on your own; just get help and collaborate!" (Yes, the pic is from MAMUN 2023)',
    },
    {
      id: 2,
      name: "Coordinator 2",
      image: "/placeholder.svg?height=150&width=150",
      role: "Role Title",
      description: "",
    },
    {
      id: 3,
      name: "Coordinator 3",
      image: "/placeholder.svg?height=150&width=150",
      role: "Role Title",
      description: "",
    },
    {
      id: 4,
      name: "Coordinator 4",
      image: "/placeholder.svg?height=150&width=150",
      role: "Role Title",
      description: "",
    },
    {
      id: 5,
      name: "Coordinator 5",
      image: "/placeholder.svg?height=150&width=150",
      role: "Role Title",
      description: "",
    },
    {
      id: 6,
      name: "Coordinator 6",
      image: "/placeholder.svg?height=150&width=150",
      role: "Role Title",
      description: "",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Navbar currentPath="/about-us" />

      <main className="space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-8">Coordinators</h1>

          <div className="space-y-12">
            {coordinators.map((coordinator) => (
              <div key={coordinator.id} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={coordinator.image || "/placeholder.svg"}
                      alt={coordinator.name}
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{coordinator.name}</h2>
                    {coordinator.description && <p className="text-gray-700">{coordinator.description}</p>}
                  </div>
                </div>
                {coordinator.id !== coordinators.length && <hr className="my-8" />}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

