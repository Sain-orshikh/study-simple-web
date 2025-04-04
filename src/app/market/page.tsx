import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SearchIcon, ShoppingCartIcon, TagIcon, UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MarketPage() {
  const items = [
    {
      id: 1,
      name: "Calculus Textbook (8th Edition)",
      category: "Textbooks",
      price: 45,
      condition: "Like New",
      seller: "Alex K.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Barely used, no highlights or notes.",
    },
    {
      id: 2,
      name: "Scientific Calculator (TI-84)",
      category: "Electronics",
      price: 65,
      condition: "Good",
      seller: "Jamie L.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Works perfectly, minor scratches on the screen.",
    },
    {
      id: 3,
      name: "Chemistry Lab Coat (Size M)",
      category: "Lab Equipment",
      price: 15,
      condition: "New",
      seller: "Taylor S.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Never used, still in original packaging.",
    },
    {
      id: 4,
      name: "Introduction to Psychology Textbook",
      category: "Textbooks",
      price: 30,
      condition: "Good",
      seller: "Jordan P.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Some highlighting in the first few chapters.",
    },
    {
      id: 5,
      name: "Laptop Stand",
      category: "Electronics",
      price: 20,
      condition: "Like New",
      seller: "Casey M.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Adjustable height, foldable for easy storage.",
    },
    {
      id: 6,
      name: "Engineering Drawing Set",
      category: "Supplies",
      price: 25,
      condition: "Good",
      seller: "Riley B.",
      image: "/placeholder.svg?height=150&width=150",
      description: "Complete set with compass, rulers, and protractors.",
    },
  ]

  const categories = ["All", "Textbooks", "Electronics", "Lab Equipment", "Supplies", "Furniture", "Other"]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Navbar currentPath="/market" />

      <main className="space-y-8">
        <h1 className="text-3xl font-bold mb-6">Student Marketplace</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search for items..." className="pl-10" />
          </div>
          <Button>
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Sell an Item
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm ${
                index === 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <span className="font-bold text-green-600">${item.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <TagIcon className="h-4 w-4 mr-1" />
                      {item.category}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {item.seller}
                    </div>
                    <p className="text-sm mt-2">{item.description}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded">
                      Condition: {item.condition}
                    </span>
                  </div>
                  <Button size="sm" className="mt-3">
                    Contact Seller
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Marketplace Guidelines</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All transactions are between students; the school is not responsible for any issues.</li>
            <li>Meet in public places on campus for exchanges.</li>
            <li>Verify the condition of items before completing a purchase.</li>
            <li>Be honest about the condition of items you&apos;re selling.</li>
            <li>No prohibited items (see full guidelines for details).</li>
          </ul>
          <Button variant="outline" className="mt-4">
            View Full Guidelines
          </Button>
        </div>
      </main>
    </div>
  )
}

