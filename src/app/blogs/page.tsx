import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Prepare for Final Exams",
      excerpt:
        "Final exams can be stressful, but with the right preparation strategy, you can ace them. Here are some tips to help you prepare effectively.",
      author: "Study Simple Team",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Study Tips",
    },
    {
      id: 2,
      title: "The Benefits of Study Groups",
      excerpt:
        "Studying with peers can enhance your learning experience. Discover how study groups can improve your understanding and retention of material.",
      author: "Araljan Abal",
      date: "April 28, 2023",
      readTime: "4 min read",
      category: "Collaboration",
    },
    {
      id: 3,
      title: "Time Management for Students",
      excerpt:
        "Balancing academics, extracurriculars, and personal life can be challenging. Learn effective time management techniques to maximize productivity.",
      author: "Study Simple Team",
      date: "April 10, 2023",
      readTime: "6 min read",
      category: "Productivity",
    },
    {
      id: 4,
      title: "Note-Taking Strategies That Work",
      excerpt:
        "Effective note-taking is a skill that can significantly impact your academic success. Explore different methods and find what works for you.",
      author: "Study Simple Team",
      date: "March 22, 2023",
      readTime: "7 min read",
      category: "Study Skills",
    },
  ]

  const categories = [
    "All",
    "Study Tips",
    "Productivity",
    "Collaboration",
    "Study Skills",
    "Mental Health",
    "Technology",
  ]

  return (
    <>
      <Navbar currentPath="/blogs" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Blogs</h1>

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

          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                <Link href={`/blogs/${post.id}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">{post.title}</h2>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
                    </div>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

