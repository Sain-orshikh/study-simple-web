"use client"

import React, { useState } from "react"
import { X, Minimize, Maximize, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PomodoroTimer } from "./PomodoroTimer"
import { Calculator } from "./Calculator"
import { CitationGenerator } from "./CitationGenerator"

// Tool definitions
export const tools = [
  {
    id: "pomodoro",
    name: "Pomodoro Timer",
    component: PomodoroTimer
  },
  {
    id: "calculator",
    name: "Calculator",
    component: Calculator
  },
  {
    id: "citation",
    name: "Citation Generator",
    component: CitationGenerator
  }
];

interface ToolInstance {
  id: string;
  toolId: string;
  minimized: boolean;
}

export function ToolsGrid() {
  const [activeTools, setActiveTools] = useState<ToolInstance[]>([]);
  
  // Add a tool to the grid
  const addTool = (toolId: string) => {
    // Check if we already have 3 tools open
    if (activeTools.filter(t => !t.minimized).length >= 3) {
      return;
    }
    
    // Generate a unique instance ID
    const instanceId = `${toolId}-${Date.now()}`;
    setActiveTools([...activeTools, { id: instanceId, toolId, minimized: false }]);
  };
  
  // Remove a tool from the grid
  const removeTool = (instanceId: string) => {
    setActiveTools(activeTools.filter(tool => tool.id !== instanceId));
  };
  
  // Toggle minimize/maximize for a tool
  const toggleMinimize = (instanceId: string) => {
    setActiveTools(activeTools.map(tool => {
      if (tool.id === instanceId) {
        return { ...tool, minimized: !tool.minimized };
      }
      return tool;
    }));
  };
  
  // Determine the grid layout class based on number of active tools
  const getGridClass = () => {
    const visibleToolsCount = activeTools.filter(t => !t.minimized).length;
    
    if (visibleToolsCount === 0) {
      return "hidden";
    } else if (visibleToolsCount === 1) {
      return "grid-cols-1";
    } else if (visibleToolsCount === 2) {
      // On mobile, stack vertically regardless of count
      return "grid-cols-1 md:grid-cols-2";
    } else {
      // On mobile, stack vertically; on tablet use 2 cols; on desktop use 3 cols
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };
  
  // Get the tool component by ID
  const getToolComponent = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      const ToolComponent = tool.component;
      return <ToolComponent />;
    }
    return <div>Tool not found</div>;
  };
  
  // Get the tool name by ID
  const getToolName = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    return tool?.name || "Unknown Tool";
  };
  
  // Minimized tools tray at the bottom
  const renderMinimizedTools = () => {
    const minimizedTools = activeTools.filter(t => t.minimized);
    
    if (minimizedTools.length === 0) {
      return null;
    }
    
    return (
      <div className="fixed bottom-4 left-4 flex flex-wrap gap-2 z-50 max-w-[calc(100vw-2rem)]">
        {minimizedTools.map(tool => (
          <Button
            key={tool.id}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-white shadow-md border text-xs"
            onClick={() => toggleMinimize(tool.id)}
          >
            <span className="truncate max-w-[80px]">{getToolName(tool.toolId)}</span>
            <Maximize className="h-3 w-3 flex-shrink-0" />
          </Button>
        ))}
      </div>
    );
  };
  
  // Main grid of tools
  const renderToolsGrid = () => {
    const visibleTools = activeTools.filter(t => !t.minimized);
    
    if (visibleTools.length === 0) {
      return null;
    }
    
    return (
      <div className={`grid ${getGridClass()} gap-4 mt-4`}>
        {visibleTools.map(tool => (
          <Card key={tool.id} className="w-full overflow-hidden">
            <CardHeader className="p-3 bg-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-base">{getToolName(tool.toolId)}</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleMinimize(tool.id)}
                >
                  <Minimize className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-red-500"
                  onClick={() => removeTool(tool.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                {getToolComponent(tool.toolId)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg font-medium">Active Tools</h3>
        <div className="flex flex-wrap gap-2">
          {activeTools.length < 3 && (
            <>
              {tools.map(tool => (
                <Button
                  key={tool.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addTool(tool.id)}
                  disabled={activeTools.filter(t => !t.minimized).length >= 3}
                  className="flex items-center gap-1 text-xs sm:text-sm"
                >
                  <span>{tool.name}</span>
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
      
      {activeTools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 border border-dashed rounded-lg bg-gray-50">
          <LayoutGrid className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No active tools</h3>
          <p className="text-gray-500 mt-2">Select a tool to add it to your workspace</p>
        </div>
      )}
      
      {renderToolsGrid()}
      {renderMinimizedTools()}
    </div>
  );
}