"use client"

import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-[#5f2995]">Ready to boost your academic journey?</h2>
          <p className="text-lg text-gray-700">
            Explore our comprehensive collection of resources designed to help you succeed in your studies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/studies">
              <button className="h-11 rounded-md bg-[#5f2995] py-2 px-6 text-white text-sm font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                Browse Study Materials
              </button>
            </Link>
            <Link href="/study-tools">
              <button className="h-11 rounded-md border bg-transparent py-2 px-6 text-black text-sm font-medium hover:bg-[#b98cd1]/20 hover:text-[#5f2995] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                Try Study Tools
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}