import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Suggestion() {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Have a Suggestion?</h2>
      <p className="mb-4">
        Know of a great study tool or technique we should include? Let us know!
      </p>
      <Button variant="outline">Submit Suggestion</Button>
    </div>
  )
}