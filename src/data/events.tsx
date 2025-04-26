import React from "react";
import { Calendar, Users } from "lucide-react";

// Define Event type
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  dateString: string;
  eventDate: Date;
  location: string;
  imageUrl?: string;
  category: string;
  link: string;
  icon: React.ReactElement;
}

// Events data
export const eventsData: Event[] = [
  {
    id: "graduation-ceremony-2025",
    title: "🎓 Graduation Ceremony 2025",
    description: "Join us to celebrate the achievements of our graduating class of 2025. A special ceremony to honor our students as they embark on the next chapter of their academic journey.",
    date: "2025-06-15",
    dateString: "June 15, 2025 at 10:00 AM",
    eventDate: new Date("2025-06-15T10:00:00"),
    location: "School Auditorium",
    category: "Academic",
    link: "https://maistimes.org",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "volleyball-tournament-2025",
    title: "🏐 Volleyball Tournament 2025",
    description: "The annual volleyball tournament featured intense competition, divided into two divisions: 9th–10th and 11th–12th grades.",
    date: "2025-02-15",
    dateString: "February 14-15, 2025",
    eventDate: new Date("2025-02-15"),
    location: "Mongol Aspiration International School",
    category: "Sports",
    link: "https://maistimes.org",
    imageUrl: "/events/volleyballtournament.png",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "passion-project-tips",
    title: "💡 Passion Project Tips",
    description: "Guidance on selecting activities for the Green Future initiative, emphasizing the importance of aligning projects with university admission goals.",
    date: "2025-02-24",
    dateString: "February 24, 2025",
    eventDate: new Date("2025-02-24"),
    location: "Online",
    category: "Academic",
    link: "https://maistimes.org",
    imageUrl: "/events/passionprojecttips.png",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "alumni-forum-2025",
    title: "🧑‍💼 Alumni Forum 2025",
    description: "Business & Finance Alumni Panel providing students with insights and inspiration from alumni in the business and finance sectors.",
    date: "2025-02-22",
    dateString: "February 22, 2025",
    eventDate: new Date("2025-02-22"),
    location: "School art hall",
    category: "Career",
    link: "https://maistimes.org",
    imageUrl: "/events/alumniforum.JPG",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "spirit-week-2024",
    title: "🎉 Spirit Week 2024",
    description: "Activities included: Monday - Thanksgiving Box for gratitude notes, Tuesday - Twin Day, Wednesday - Pajama Day, Thursday - Class Color Day, Friday - Talent Show. Purpose: Fostering creativity, teamwork, and friendly competition among students.",
    date: "2024-11-29",
    dateString: "November 25-29, 2024",
    eventDate: new Date("2024-11-29"),
    location: "School Campus",
    category: "School Spirit",
    link: "https://maistimes.org",
    imageUrl: "/events/spiritweek.jpeg",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "5-day-fun",
    title: "🎁 5-Day Fun",
    description: "Holiday celebrations with: Monday - Secret Santa/Monita, Tuesday - Ugly Sweater Day, Wednesday - Movie Marathon, Thursday - Holiday Crafts, Friday - Winter Wonderland Dance. Goal: Celebrating the holiday spirit with a week of themed activities.",
    date: "2024-12-20",
    dateString: "December 16-20, 2024",
    eventDate: new Date("2024-12-20"),
    location: "School Campus",
    category: "School Spirit",
    link: "https://maistimes.org",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "midnight-masquerade",
    title: "🎭 Midnight Masquerade: MAIS New Year Prom 2024",
    description: "An elegant evening celebrating student achievements and welcoming the new year.",
    date: "2024-12-27",
    dateString: "December 27, 2024",
    eventDate: new Date("2024-12-27"),
    location: "School Hall",
    category: "Social",
    link: "https://maistimes.org",
    imageUrl: "/events/midnightmasquerade.png",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "teachers-day-2024",
    title: "🍎 Teacher's Day 2024",
    description: "Students honored teachers by taking on their roles for the day, teaching classes and advising peers.",
    date: "2024-10-04",
    dateString: "October 4, 2024",
    eventDate: new Date("2024-10-04"),
    location: "School Campus",
    category: "School Spirit",
    link: "https://maistimes.org",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "basketball-tournament-2024",
    title: "🏀 Basketball Tournament 2024",
    description: "A competitive tournament showcasing student athleticism and teamwork. Divisions: Grades 9–10 and 11–12.",
    date: "2024-10-29",
    dateString: "October 28-29, 2024",
    eventDate: new Date("2024-10-29"),
    location: "School Gymnasium",
    category: "Sports",
    link: "https://maistimes.org",
    imageUrl: "/events/basketballtournament.png",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "autumn-sports-day-2024",
    title: "🍂 Autumn Sports Day 2024",
    description: "\"Namriin Sprtkat\" - Internal school competitions with students representing their classes in various sports.",
    date: "2024-10-05",
    dateString: "Late September to early October 2024",
    eventDate: new Date("2024-10-05"),
    location: "School Playground",
    category: "Sports",
    link: "https://maistimes.org",
    imageUrl: "/events/autumnsportsday.jpg",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "back-to-school",
    title: "📚 Back to School!",
    description: "Commencement of the new academic year with an opening ceremony after the summer break.",
    date: "2024-09-01",
    dateString: "September 1, 2024",
    eventDate: new Date("2024-09-01"),
    location: "School Campus",
    category: "Academic",
    link: "https://maistimes.org",
    imageUrl: "/events/backtoschool.jpg",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "shark-tank-2024",
    title: "🦈 Shark Tank 2024",
    description: "Students pitch innovative business ideas to a panel of judges for a chance to win funding and mentorship. Develop your entrepreneurial skills and bring your creative solutions to life!",
    date: "2024-11-09",
    dateString: "November 9, 2024",
    eventDate: new Date("2024-11-09"),
    location: "School Auditorium",
    category: "Entrepreneurship",
    link: "https://maistimes.org",
    imageUrl: "/events/sharktank.JPG",
    icon: <Users className="h-5 w-5" />
  }
];

// Function to get upcoming events
export const getUpcomingEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to get past events
export const getPastEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to get the next event
export const getNextEvent = (events: Event[]) => {
  const upcomingEvents = getUpcomingEvents(events);
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
};