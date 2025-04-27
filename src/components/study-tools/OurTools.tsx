"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LightbulbIcon, Timer, Calculator as CalculatorIcon, FileText } from "lucide-react"
import { ToolsGrid, tools } from "./ToolsGrid"
import { useState } from "react"

export function OurTools() {
  const [showTools, setShowTools] = useState(false);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <LightbulbIcon className="h-6 w-6 mr-2 text-yellow-500" />
        Our Tools
      </h2>

      {!showTools ? (
        // Show tool cards when tools are not active
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full overflow-hidden">
          <Card className="p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow w-full">
            <div className="mb-4"><Timer className="h-10 w-10 text-primary" /></div>
            <h2 className="text-xl font-semibold mb-2">Pomodoro Timer</h2>
            <p className="text-gray-600 mb-4">
              Stay focused using the Pomodoro Technique with customizable work and break intervals.
            </p>
            <Button 
              className="mt-auto w-full sm:w-auto"
              onClick={() => setShowTools(true)}
            >
              Use Tools
            </Button>
          </Card>
          
          <Card className="p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow w-full">
            <div className="mb-4"><CalculatorIcon className="h-10 w-10 text-primary" /></div>
            <h2 className="text-xl font-semibold mb-2">Calculator</h2>
            <p className="text-gray-600 mb-4">
              A simple calculator for quick mathematical calculations while studying.
            </p>
            <Button 
              className="mt-auto w-full sm:w-auto"
              onClick={() => setShowTools(true)}
            >
              Use Tools
            </Button>
          </Card>
          
          <Card className="p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow w-full">
            <div className="mb-4"><FileText className="h-10 w-10 text-primary" /></div>
            <h2 className="text-xl font-semibold mb-2">Citation Generator</h2>
            <p className="text-gray-600 mb-4">
              Generate properly formatted citations for books, websites, and journal articles in MLA, APA, and Chicago styles.
            </p>
            <Button 
              className="mt-auto w-full sm:w-auto"
              onClick={() => setShowTools(true)}
            >
              Use Tools
            </Button>
          </Card>
        </div>
      ) : (
        // Show tools grid when tools are active
        <div className="mb-6 w-full overflow-hidden">
          <div className="flex justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTools(false)}
            >
              Back to Tool Overview
            </Button>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-6 max-w-full">
            <ToolsGrid />
          </div>
        </div>
      )}
    </section>
  )
}