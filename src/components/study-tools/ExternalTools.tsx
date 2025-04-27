import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon } from "lucide-react"
import { ExternalToolType } from "@/data/study-tools/external-tools"

interface ExternalToolsProps {
  tools: ExternalToolType[];
}

export function ExternalTools({ tools }: ExternalToolsProps) {
  return (
    <section className="pt-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <ExternalLinkIcon className="h-6 w-6 mr-2 text-blue-500" />
        External Tools
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow bg-blue-50"
          >
            <div className="mb-4">{tool.icon}</div>
            <h2 className="text-lg font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
            <Button asChild className="mt-auto" variant="outline">
              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}