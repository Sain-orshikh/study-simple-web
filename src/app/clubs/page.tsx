"use client"

{/* zza claude aimar ym bnu. Zlog harjinu, ene ystoi solioruuldin bn. form hihed tus bolloshd cold sigma */}



import { useState } from "react"
import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  BookOpenIcon,
  MusicIcon,
  PaletteIcon,
  CodeIcon,
  GlobeIcon,
  CameraIcon,
  XIcon,
  CheckCircleIcon,
} from "lucide-react"

type Club = {
  id: number
  name: string
  description: string
  icon: JSX.Element
  meetingDay: string
  meetingTime: string
  location: string
  members: number
}

interface FormData {
  name: string
  className: string
  email: string
  reason: string
}

interface ProposalFormData {
  clubName: string
  advisorName: string
  memberCount: string
  reason: string
}

export default function ClubsPage() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const [showMembershipForm, setShowMembershipForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    className: "",
    email: "",
    reason: ""
  })
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  
  // club proposal form new state 
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalFormSubmitted, setProposalFormSubmitted] = useState(false)
  const [proposalFormData, setProposalFormData] = useState<ProposalFormData>({
    clubName: "",
    advisorName: "",
    memberCount: "",
    reason: ""
  })
  const [proposalFormErrors, setProposalFormErrors] = useState<Partial<ProposalFormData>>({})

  const clubs = [
    {
      id: 1,
      name: "Book Club",
      description: "Join us to discuss interesting books and share your thoughts with fellow book lovers.",
      icon: <BookOpenIcon className="h-6 w-6 text-blue-600" />,
      meetingDay: "Tuesdays",
      meetingTime: "4:00 PM - 5:30 PM",
      location: "Library, Room 102",
      members: 24,
    },
    {
      id: 2,
      name: "Music Club",
      description: "For students interested in playing instruments, singing, or music production.",
      icon: <MusicIcon className="h-6 w-6 text-purple-600" />,
      meetingDay: "Mondays & Wednesdays",
      meetingTime: "3:30 PM - 5:00 PM",
      location: "Music Room",
      members: 32,
    },
    {
      id: 3,
      name: "Art Club",
      description: "Express your creativity through various art forms including painting, drawing, and sculpture.",
      icon: <PaletteIcon className="h-6 w-6 text-yellow-600" />,
      meetingDay: "Fridays",
      meetingTime: "3:30 PM - 5:00 PM",
      location: "Art Room",
      members: 18,
    },
    {
      id: 4,
      name: "Coding Club",
      description: "Learn programming languages, work on coding projects, and participate in hackathons.",
      icon: <CodeIcon className="h-6 w-6 text-green-600" />,
      meetingDay: "Thursdays",
      meetingTime: "4:00 PM - 5:30 PM",
      location: "Computer Lab 2",
      members: 27,
    },
    {
      id: 5,
      name: "International Club",
      description: "Celebrate cultural diversity, learn about different countries, and organize cultural events.",
      icon: <GlobeIcon className="h-6 w-6 text-red-600" />,
      meetingDay: "Every other Wednesday",
      meetingTime: "3:30 PM - 4:30 PM",
      location: "Room 203",
      members: 22,
    },
    {
      id: 6,
      name: "Photography Club",
      description: "Learn photography techniques, go on photo walks, and showcase your work in exhibitions.",
      icon: <CameraIcon className="h-6 w-6 text-indigo-600" />,
      meetingDay: "Tuesdays",
      meetingTime: "4:00 PM - 5:00 PM",
      location: "Room 210",
      members: 15,
    },
  ]

  const handleJoinClub = (club: Club) => {
    setSelectedClub(club)
    setShowMembershipForm(false)
    setFormSubmitted(false)
  }

  const closeClubDetails = () => {
    setSelectedClub(null)
    setShowMembershipForm(false)
    setFormSubmitted(false)
    resetForm()
  }

  const openMembershipForm = () => {
    setShowMembershipForm(true)
    setFormSubmitted(false)
  }
  
  const openProposalForm = () => {
    setShowProposalForm(true)
    setProposalFormSubmitted(false)
  }
  
  const closeProposalForm = () => {
    setShowProposalForm(false)
    setProposalFormSubmitted(false)
    resetProposalForm()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }
  
 
  const handleProposalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposalFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
   
    if (proposalFormErrors[name as keyof ProposalFormData]) {
      setProposalFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }
    
    if (!formData.className.trim()) {
      errors.className = "Class is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email"
    }
    
    if (!formData.reason.trim()) {
      errors.reason = "Reason for joining is required"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Validate proposal form
  const validateProposalForm = (): boolean => {
    const errors: Partial<ProposalFormData> = {}
    
    if (!proposalFormData.clubName.trim()) {
      errors.clubName = "Club name is required"
    }
    
    if (!proposalFormData.advisorName.trim()) {
      errors.advisorName = "Faculty advisor name is required"
    }
    
    if (!proposalFormData.memberCount.trim()) {
      errors.memberCount = "Member count is required"
    } else {
      const count = parseInt(proposalFormData.memberCount)
      if (isNaN(count) || count < 5) {
        errors.memberCount = "At least 5 members are required"
      }
    }
    
    if (!proposalFormData.reason.trim()) {
      errors.reason = "Reason for creating club is required"
    }
    
    setProposalFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setFormSubmitted(true)
    }
  }
  
  
  const handleSubmitProposalForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateProposalForm()) {
      console.log("Proposal form submitted:", proposalFormData)
      setProposalFormSubmitted(true)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      className: "",
      email: "",
      reason: ""
    })
    setFormErrors({})
  }
  
  const resetProposalForm = () => {
    setProposalFormData({
      clubName: "",
      advisorName: "",
      memberCount: "",
      reason: ""
    })
    setProposalFormErrors({})
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Clubs</h1>

          <p className="text-lg mb-6">
            Explore the various clubs and extracurricular activities available. Joining a club is a great way to pursue
            your interests, develop new skills, and make friends!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {clubs.map((club) => (
              <Card key={club.id} className="p-6">
                <div className="flex items-center mb-4">
                  {club.icon}
                  <h2 className="text-xl font-semibold ml-2">{club.name}</h2>
                </div>

                <p className="text-gray-600 mb-4">{club.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.meetingDay}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.meetingTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{club.members} members</span>
                  </div>
                </div>

                <Button size="sm" onClick={() => handleJoinClub(club)}>Join Club</Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Start a New Club</h2>
            <p className="mb-4">
              Have an idea for a club that doesn&apos;t exist yet? You can propose a new club by following these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Find a faculty advisor willing to sponsor the club</li>
              <li>Gather at least 5 interested students</li>
              <li>Complete the club proposal form</li>
              <li>Submit your proposal to the Student Activities Coordinator</li>
            </ol>
            <Button onClick={openProposalForm}>Get Club Proposal Form</Button>
          </div>
        </main>
      </div>

      
      {selectedClub && (
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeClubDetails}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {formSubmitted ? (
              <div className="p-8 text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Form Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in joining the {selectedClub.name}. 
                  We&apos;ve received your application and will contact you soon.
                </p>
                <Button onClick={closeClubDetails}>Close</Button>
              </div>
            ) : showMembershipForm ? (
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Join {selectedClub.name}</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowMembershipForm(false)} className="hover:bg-gray-100 rounded-full p-2">
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                      Class/Grade *
                    </label>
                    <input
                      type="text"
                      id="className"
                      name="className"
                      value={formData.className}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${formErrors.className ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your class or grade"
                    />
                    {formErrors.className && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.className}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to join this club? *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${formErrors.reason ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Tell us why you're interested in joining"
                    />
                    {formErrors.reason && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.reason}</p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button type="button" variant="outline" onClick={() => setShowMembershipForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Send Form
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-gray-100">
                      {selectedClub.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{selectedClub.name}</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeClubDetails} className="hover:bg-gray-100 rounded-full p-2">
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700 mb-4">{selectedClub.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">Meeting Details</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-gray-600" />
                        <span><strong>Day:</strong> {selectedClub.meetingDay}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                        <span><strong>Time:</strong> {selectedClub.meetingTime}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
                        <span><strong>Location:</strong> {selectedClub.location}</span>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-5 w-5 mr-2 text-gray-600" />
                        <span><strong>Current Members:</strong> {selectedClub.members}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Join {selectedClub.name}</h3>
                    <p className="mb-4">
                      Interested in joining? Fill out the membership form and attend our next meeting!
                    </p>
                    <Button className="w-full mb-2" onClick={openMembershipForm}>Membership Form</Button>

                   {/* Background transparent bolgono */}
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Upcoming Events</h4>
                      <ul className="mt-2 space-y-2">
                        <li className="text-sm">• Next regular meeting: {selectedClub.meetingDay} at {selectedClub.meetingTime}</li>
                        <li className="text-sm">• Special workshop this month</li>
                        <li className="text-sm">• End of semester showcase</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                  <Button onClick={closeClubDetails} variant="outline" className="mr-2">Close</Button>
                  <Button onClick={openMembershipForm}>Join Now</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      
      {showProposalForm && (
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeProposalForm}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {proposalFormSubmitted ? (
              <div className="p-8 text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Form Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in starting a new club. 
                  We&apos;ve received your proposal for "{proposalFormData.clubName}" and will contact you soon.
                </p>
                <Button onClick={closeProposalForm}>Close</Button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Club Proposal Form</h2>
                  <Button variant="ghost" size="sm" onClick={closeProposalForm} className="hover:bg-gray-100 rounded-full p-2">
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                <form onSubmit={handleSubmitProposalForm} className="space-y-4">
                  <div>
                    <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
                      Club Name *
                    </label>
                    <input
                      type="text"
                      id="clubName"
                      name="clubName"
                      value={proposalFormData.clubName}
                      onChange={handleProposalInputChange}
                      className={`w-full p-2 border rounded-md ${proposalFormErrors.clubName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter proposed club name"
                    />
                    {proposalFormErrors.clubName && (
                      <p className="text-red-500 text-xs mt-1">{proposalFormErrors.clubName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="advisorName" className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty Advisor Name *
                    </label>
                    <input
                      type="text"
                      id="advisorName"
                      name="advisorName"
                      value={proposalFormData.advisorName}
                      onChange={handleProposalInputChange}
                      className={`w-full p-2 border rounded-md ${proposalFormErrors.advisorName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter faculty advisor's name"
                    />
                    {proposalFormErrors.advisorName && (
                      <p className="text-red-500 text-xs mt-1">{proposalFormErrors.advisorName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="memberCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Interested Members * (minimum 5)
                    </label>
                    <input
                      type="number"
                      id="memberCount"
                      name="memberCount"
                      min="5"
                      value={proposalFormData.memberCount}
                      onChange={handleProposalInputChange}
                      className={`w-full p-2 border rounded-md ${proposalFormErrors.memberCount ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter number of interested members"
                    />
                    {proposalFormErrors.memberCount && (
                      <p className="text-red-500 text-xs mt-1">{proposalFormErrors.memberCount}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Creating Club *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={4}
                      value={proposalFormData.reason}
                      onChange={handleProposalInputChange}
                      className={`w-full p-2 border rounded-md ${proposalFormErrors.reason ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Explain why you want to create this club and what activities you plan to organize"
                    />
                    {proposalFormErrors.reason && (
                      <p className="text-red-500 text-xs mt-1">{proposalFormErrors.reason}</p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button type="button" variant="outline" onClick={closeProposalForm}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Send Form
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}