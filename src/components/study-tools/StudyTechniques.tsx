import { Card } from "@/components/ui/card"
import { BrainIcon } from "lucide-react"
import { StudyTechniqueType } from "@/data/study-tools/study-techniques"

interface StudyTechniquesProps {
  techniques: StudyTechniqueType[];
}

export function StudyTechniques({ techniques }: StudyTechniquesProps) {
  return (
    <section className="pt-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <BrainIcon className="h-6 w-6 mr-2 text-green-500" />
        Effective Study Techniques
      </h2>
      <div className="space-y-6">
        {techniques.map((technique, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{technique.title}</h3>
            <p className="text-gray-600 mb-2">{technique.description}</p>
            <p className="text-sm text-green-700 italic">{technique.tips}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}