import { ReactNode } from "react";
import {
  TimerIcon,
  CalculatorIcon,
  BookmarkIcon,
} from "lucide-react";

export interface ToolType {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export const ourTools: ToolType[] = [
  {
    id: 1,
    name: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks.",
    icon: <TimerIcon className="h-10 w-10 text-red-500" />,
    link: "/study-tools/pomodoro",
  },
  {
    id: 2,
    name: "Calculator",
    description: "Scientific calculator for math and science problems.",
    icon: <CalculatorIcon className="h-10 w-10 text-gray-500" />,
    link: "/study-tools/calculator",
  },
  {
    id: 3,
    name: "Citation Generator",
    description: "Generate citations in various formats for your papers.",
    icon: <BookmarkIcon className="h-10 w-10 text-orange-500" />,
    link: "/study-tools/citations",
  },
];