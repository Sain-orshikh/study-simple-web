import { Navbar } from "@/components/navbar/navbar"

export default function OthersPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main>
          <h1 className="text-3xl font-bold mb-6">Others</h1>
          <p className="text-gray-600 mb-8">Additional resources and information will be available here.</p>
        </main>
      </div>
    </>
  )
}

