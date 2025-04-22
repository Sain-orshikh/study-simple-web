"use client"

export function WhyUseSection() {
  return (
    <section className="py-12 bg-[#b98cd1]/10 border-b">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#5f2995]">Why Use Study Simple?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#8655ac]">All-in-One Platform</h3>
            <p className="text-gray-700">Access study tools, resources, clubs, and a student marketplace in one place.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#8655ac]">Student Community</h3>
            <p className="text-gray-700">Connect, collaborate, and share with fellow students and club members.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#8655ac]">Free & Always Updated</h3>
            <p className="text-gray-700">Enjoy free access to resources, with new content and features added regularly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}