"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/sidebar/sidebar";
import TutorCard from "@/components/ui/TutorCard";
import ContactTutorModal from "@/components/ui/ContactTutorModal";
import { mockTutors } from "@/data/tutors";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { TutorProps } from "@/components/ui/TutorCard";
import { Toaster } from "react-hot-toast";

export default function TutorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<TutorProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get unique subjects from all tutors
  const allSubjects = useMemo(() => {
    const subjects = new Set<string>();
    mockTutors.forEach(tutor => {
      tutor.subjects.forEach(subject => subjects.add(subject));
    });
    return Array.from(subjects).sort();
  }, []);

  // Filter tutors based on search term, selected grades, and selected subjects
  const filteredTutors = useMemo(() => {
    return mockTutors.filter(tutor => {
      // Search filter
      const searchMatch = 
        searchTerm === "" || 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        tutor.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Grade filter
      const gradeMatch = 
        selectedGrades.length === 0 || 
        selectedGrades.includes(tutor.grade);
      
      // Subject filter
      const subjectMatch = 
        selectedSubjects.length === 0 || 
        tutor.subjects.some(subject => 
          selectedSubjects.includes(subject)
        );
      
      return searchMatch && gradeMatch && subjectMatch;
    });
  }, [searchTerm, selectedGrades, selectedSubjects]);

  // Toggle grade selection
  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade) 
        : [...prev, grade]
    );
  };

  // Toggle subject selection
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGrades([]);
    setSelectedSubjects([]);
  };

  // Handle contact button click
  const handleContactClick = (tutor: TutorProps) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  // Close contact modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTutor(null);
  };

  // Hide dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsGradeDropdownOpen(false);
      setIsSubjectDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Prevent dropdown toggles from bubbling
  const handleDropdownToggle = (
    e: React.MouseEvent, 
    dropdown: 'grade' | 'subject'
  ) => {
    e.stopPropagation();
    if (dropdown === 'grade') {
      setIsGradeDropdownOpen(!isGradeDropdownOpen);
      setIsSubjectDropdownOpen(false);
    } else {
      setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
      setIsGradeDropdownOpen(false);
    }
  };

  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Toaster position="top-right" />
          <main>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold">Find a Tutor</h1>
              <p className="text-muted-foreground mt-2 md:mt-0">
                {filteredTutors.length} tutor{filteredTutors.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or subject..."
                    className="pl-10"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Grade Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto justify-between"
                    onClick={(e) => handleDropdownToggle(e, 'grade')}
                  >
                    {selectedGrades.length === 0 
                      ? "Filter by Grade" 
                      : `Grade${selectedGrades.length > 1 ? "s" : ""}: ${selectedGrades.join(", ")}`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  {isGradeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border p-2">
                      {["9", "10", "11", "12"].map((grade) => (
                        <div 
                          key={grade} 
                          className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleGrade(grade);
                          }}
                        >
                          <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${selectedGrades.includes(grade) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                            {selectedGrades.includes(grade) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>Grade {grade}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subject Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto justify-between"
                    onClick={(e) => handleDropdownToggle(e, 'subject')}
                  >
                    {selectedSubjects.length === 0 
                      ? "Filter by Subject" 
                      : `Subject${selectedSubjects.length > 1 ? "s" : ""}: ${selectedSubjects.length}`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  {isSubjectDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg rounded-md border p-2 max-h-72 overflow-y-auto right-0">
                      {allSubjects.map((subject) => (
                        <div 
                          key={subject} 
                          className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubject(subject);
                          }}
                        >
                          <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${selectedSubjects.includes(subject) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                            {selectedSubjects.includes(subject) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm">{subject}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Clear Filters */}
                {(selectedGrades.length > 0 || selectedSubjects.length > 0 || searchTerm) && (
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    className="text-sm"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Active filters display */}
              {(selectedGrades.length > 0 || selectedSubjects.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedGrades.map(grade => (
                    <div key={grade} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      Grade {grade}
                      <button onClick={() => toggleGrade(grade)} className="ml-2 text-gray-500 hover:text-gray-700">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedSubjects.map(subject => (
                    <div key={subject} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {subject}
                      <button onClick={() => toggleSubject(subject)} className="ml-2 text-gray-500 hover:text-gray-700">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tutor Request Form and Info Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <Card className="p-6 md:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Request a Tutor</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What subject do you need help with?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Details</Label>
                    <Input id="message" placeholder="Tell us more about what you need help with" />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </Card>
              
              <div className="md:col-span-2">
                <Card className="p-6 h-full">
                  <h2 className="text-xl font-semibold mb-4">Why Choose Our Tutors?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Our Tutors Excel In:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Mathematics & Sciences
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          English & Literature
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          History & Social Studies
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Foreign Languages
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Computer Science
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Benefits of Peer Tutoring:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Learn from students who recently mastered the material</li>
                        <li>Relatable explanations and study strategies</li>
                        <li>Flexible scheduling that works around school activities</li>
                        <li>Personalized help focused on your specific challenges</li>
                        <li>Build confidence with supportive peer relationships</li>
                        <li>More affordable than professional tutoring services</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Tutor Cards - 2 cards per row layout */}
            {filteredTutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredTutors.map(tutor => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={tutor} 
                    onContactClick={handleContactClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No tutors match your search criteria</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </main>
        </div>
      </Sidebar>

      {/* Contact Modal */}
      <ContactTutorModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        tutor={selectedTutor}
      />
    </>
  );
}

