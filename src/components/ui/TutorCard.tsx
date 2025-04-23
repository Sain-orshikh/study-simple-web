import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, GraduationCap, CalendarClock, BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TutorProps {
  id: string;
  name: string;
  grade: "9" | "10" | "11" | "12";
  subjects: string[];
  bio: string;
  email: string;
  phone?: string;
  imageUrl: string;
  availability?: string;
}

export default function TutorCard({ tutor, onContactClick }: { tutor: TutorProps, onContactClick: (tutor: TutorProps) => void }) {
  const { name, grade, subjects, bio, email, imageUrl, availability } = tutor;
  const [showEmail, setShowEmail] = useState(false);

  // Toggle between showing "Email" text and the actual email address
  const handleEmailToggle = (e: React.MouseEvent) => {
    if (!showEmail) {
      // If we're switching to show the email, prevent the default behavior
      // so it doesn't immediately open the email client
      e.preventDefault();
    }
    setShowEmail(!showEmail);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex h-full">
        {/* Image section - left side, takes up 1/3 of the width */}
        <div className="relative w-1/3 min-w-[120px]">
          <Image 
            src={imageUrl} 
            alt={`${name} - tutor`} 
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content section - right side */}
        <div className="p-4 flex-1 flex flex-col h-full">
          <div>
            <h3 className="text-lg font-bold text-[#5f2995]">{name}</h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <GraduationCap className="h-3 w-3 mr-1" />
              <span>Grade {grade} Student</span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 text-[#5f2995] mr-1" />
              <h4 className="font-semibold text-xs">Subjects:</h4>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {subjects.map((subject, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 bg-[#5f2995]/10 text-[#5f2995] text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
          
          {availability && (
            <div className="mt-2">
              <div className="flex items-center">
                <CalendarClock className="h-3 w-3 text-[#5f2995] mr-1" />
                <h4 className="font-semibold text-xs">Availability:</h4>
              </div>
              <p className="text-xs ml-4 mt-0.5">{availability}</p>
            </div>
          )}
          
          <p className="mt-2 text-xs line-clamp-3 flex-grow">{bio}</p>
          
          <div className="mt-3 pt-2 border-t flex flex-wrap gap-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center text-xs h-7 px-2"
              onClick={handleEmailToggle}
            >
              <Mail className="h-3 w-3 mr-1" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={showEmail ? 'email' : 'label'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {showEmail ? email : "Email"}
                </motion.span>
              </AnimatePresence>
            </Button>
            <Button 
              size="sm" 
              className="flex items-center text-xs bg-[#5f2995] hover:bg-[#5f2995]/90 h-7 px-2"
              onClick={() => onContactClick(tutor)}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}