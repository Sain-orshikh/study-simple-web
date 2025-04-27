"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import * as math from 'mathjs';

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [expressionMode, setExpressionMode] = useState(true);

  const handleNumberClick = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (operation: string) => {
    setDisplay(display + operation);
  };

  const handleEquals = () => {
    try {
      // Replace × with * and ÷ with / for proper evaluation
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/sqrt\(/g, 'sqrt('); // Ensure sqrt is properly formatted
      
      const result = math.evaluate(expression);
      
      // Format the result based on its type
      let formattedResult;
      if (Number.isInteger(result)) {
        formattedResult = result.toString();
      } else {
        // Format to a reasonable number of decimal places
        formattedResult = math.format(result, { precision: 10 });
      }
      
      setDisplay(formattedResult);
      setLastAnswer(formattedResult);
    } catch (error) {
      setDisplay("Error");
      setTimeout(() => setDisplay("0"), 1500);
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleUseLastAnswer = () => {
    if (lastAnswer) {
      if (display === "0") {
        setDisplay(lastAnswer);
      } else {
        setDisplay(display + lastAnswer);
      }
    }
  };

  // Handle adding functions like sqrt, pow, etc.
  const handleFunction = (funcName: string) => {
    if (funcName === 'sqrt') {
      // Add sqrt function with opening parenthesis, so user can input the value
      if (display === "0") {
        setDisplay("sqrt(");
      } else {
        setDisplay(display + "sqrt(");
      }
    } else if (funcName === 'square') {
      try {
        // Try to evaluate the current expression first
        let valueToSquare = display;
        
        // If the display shows a complex expression, wrap it in parentheses
        if (display.includes('+') || display.includes('-') || 
            display.includes('×') || display.includes('÷') || 
            display.includes('^')) {
          valueToSquare = `(${display})`;
        }
        
        setDisplay(`${valueToSquare}^2`);
      } catch (error) {
        setDisplay(`${display}^2`);
      }
    }
  };

  // Define calculator buttons
  const buttons = [
    { value: "7", onClick: () => handleNumberClick("7") },
    { value: "8", onClick: () => handleNumberClick("8") },
    { value: "9", onClick: () => handleNumberClick("9") },
    { value: "÷", onClick: () => handleOperationClick("÷"), variant: "secondary" },
    { value: "4", onClick: () => handleNumberClick("4") },
    { value: "5", onClick: () => handleNumberClick("5") },
    { value: "6", onClick: () => handleNumberClick("6") },
    { value: "×", onClick: () => handleOperationClick("×"), variant: "secondary" },
    { value: "1", onClick: () => handleNumberClick("1") },
    { value: "2", onClick: () => handleNumberClick("2") },
    { value: "3", onClick: () => handleNumberClick("3") },
    { value: "-", onClick: () => handleOperationClick("-"), variant: "secondary" },
    { value: "0", onClick: () => handleNumberClick("0") },
    { value: ".", onClick: () => handleOperationClick(".") },
    { value: "=", onClick: handleEquals, variant: "default" },
    { value: "+", onClick: () => handleOperationClick("+"), variant: "secondary" },
  ];

  // Additional scientific buttons
  const scientificButtons = [
    { value: "^", onClick: () => handleOperationClick("^"), variant: "secondary" },
    { value: "√", onClick: () => handleFunction("sqrt"), variant: "secondary" },
    { value: "Ans", onClick: handleUseLastAnswer, variant: "outline" },
    { value: "(", onClick: () => handleOperationClick("("), variant: "outline" },
    { value: ")", onClick: () => handleOperationClick(")"), variant: "outline" },
    { value: "x²", onClick: () => handleFunction("square"), variant: "outline" },
  ];

  return (
    <div className="w-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 mb-2 rounded-md text-right text-2xl font-mono overflow-x-auto whitespace-nowrap">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        <Button 
          variant="outline" 
          className="col-span-2 h-8 text-xs" 
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button 
          variant="outline" 
          className="col-span-2 h-8 text-xs" 
          onClick={handleBackspace}
        >
          ⌫
        </Button>
        
        {/* Scientific buttons with improved layout */}
        <div className="col-span-4 grid grid-cols-6 gap-1 mb-1">
          {scientificButtons.slice(0, 4).map((button, index) => (
            <Button
              key={`sci-${index}`}
              variant={button.variant as any || "outline"}
              onClick={button.onClick}
              className="h-8 text-xs flex items-center justify-center"
              size="sm"
            >
              {button.value}
            </Button>
          ))}
          <div className="col-span-2 grid grid-cols-2 gap-1">
            {scientificButtons.slice(4).map((button, index) => (
              <Button
                key={`sci-extra-${index}`}
                variant={button.variant as any || "outline"}
                onClick={button.onClick}
                className="h-8 text-xs flex items-center justify-center"
                size="sm"
              >
                {button.value}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Standard calculator buttons */}
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant as any || "outline"}
            onClick={button.onClick}
            className="h-8 text-xs"
            size="sm"
          >
            {button.value}
          </Button>
        ))}
      </div>
      
      {/* Advanced calculator link without toggle */}
      <div className="mt-3 pt-2 border-t border-gray-200 text-xs">
        <a 
          href="https://www.desmos.com/scientific" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-700 text-xs"
        >
          Advanced Calculator <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
}