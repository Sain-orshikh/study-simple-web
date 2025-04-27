import { ReactNode } from "react";
import {
  PencilIcon,
  BookOpenIcon,
  CalendarIcon,
  ListTodoIcon,
} from "lucide-react";

export interface ExternalToolType {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export const externalTools: ExternalToolType[] = [
  {
    id: 1,
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, and organization.",
    icon: <PencilIcon className="h-10 w-10 text-black" />,
    link: "https://www.notion.so/",
  },
  {
    id: 2,
    name: "Anki",
    description: "Powerful, intelligent flashcards for effective memorization.",
    icon: <BookOpenIcon className="h-10 w-10 text-blue-700" />,
    link: "https://apps.ankiweb.net/",
  },
  {
    id: 3,
    name: "Google Calendar",
    description: "Plan your study schedule and set reminders for important deadlines.",
    icon: <CalendarIcon className="h-10 w-10 text-red-600" />,
    link: "https://calendar.google.com/",
  },
  {
    id: 4,
    name: "Todoist",
    description: "Organize tasks and manage your to-do lists efficiently.",
    icon: <ListTodoIcon className="h-10 w-10 text-red-500" />,
    link: "https://todoist.com/",
  },
];