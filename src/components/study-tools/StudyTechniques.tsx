"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { BrainIcon, ChevronDown, ChevronUp } from "lucide-react"
import { StudyTechniqueType } from "@/data/study-tools/study-techniques"

interface StudyTechniquesProps {
  techniques: StudyTechniqueType[];
}

export function StudyTechniques({ techniques }: StudyTechniquesProps) {
  const [expandedTechnique, setExpandedTechnique] = useState<number | null>(null);
  
  const toggleExpand = (index: number) => {
    setExpandedTechnique(expandedTechnique === index ? null : index);
  };
  
  return (
    <section className="pt-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <BrainIcon className="h-6 w-6 mr-2 text-green-500" />
        Effective Study Techniques
      </h2>
      <div className="space-y-4">
        {techniques.map((technique, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow overflow-hidden"
          >
            <div 
              className="p-4 flex justify-between items-center cursor-pointer" 
              onClick={() => toggleExpand(index)}
            >
              <h3 className="text-xl font-semibold">{technique.title}</h3>
              {expandedTechnique === index ? (
                <ChevronUp className="h-5 w-5 text-green-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-green-600" />
              )}
            </div>
            
            {expandedTechnique === index && (
              <div className="px-4 pb-4 pt-1 bg-green-50 border-t border-green-100">
                <p className="text-gray-700 mb-3">{technique.description}</p>
                <p className="text-sm text-green-700 italic">{technique.tips}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}