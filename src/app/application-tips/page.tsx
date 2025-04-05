import { Navbar } from "@/components/navbar/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCapIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function ApplicationTipsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">Application Tips</h1>

          <p className="text-lg mb-6">
            Get helpful tips and guidance for your college and scholarship applications. These resources will help you
            navigate the application process successfully.
          </p>

          <Tabs defaultValue="college">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="college">College Applications</TabsTrigger>
              <TabsTrigger value="scholarship">Scholarships</TabsTrigger>
              <TabsTrigger value="resume">Resume & CV</TabsTrigger>
            </TabsList>

            <TabsContent value="college" className="mt-6 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCapIcon className="h-5 w-5 mr-2" />
                  College Application Timeline
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium w-32 text-center mr-4">
                      Junior Year
                    </div>
                    <div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Research colleges and create a list of potential schools</li>
                        <li>Take standardized tests (SAT/ACT)</li>
                        <li>Visit campuses if possible</li>
                        <li>Begin thinking about recommendation letters</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium w-32 text-center mr-4">
                      Summer
                    </div>
                    <div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Work on your personal statement</li>
                        <li>Prepare for additional standardized tests if needed</li>
                        <li>Research scholarship opportunities</li>
                        <li>Create a system to track application deadlines</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium w-32 text-center mr-4">
                      Fall Senior Year
                    </div>
                    <div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Request recommendation letters</li>
                        <li>Finalize your college list</li>
                        <li>Complete and submit applications</li>
                        <li>Submit FAFSA and other financial aid forms</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium w-32 text-center mr-4">
                      Winter/Spring
                    </div>
                    <div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Review acceptance letters</li>
                        <li>Compare financial aid packages</li>
                        <li>Make your final decision</li>
                        <li>Submit enrollment deposit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Statement Tips</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Be authentic</h3>
                      <p className="text-gray-600">
                        Write in your own voice and share your genuine experiences and perspectives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Show, don&apos;t tell</h3>
                      <p className="text-gray-600">
                        Use specific examples and anecdotes to illustrate your qualities and achievements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Address the prompt</h3>
                      <p className="text-gray-600">
                        Make sure your essay directly responds to the prompt or question asked.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Avoid clichés</h3>
                      <p className="text-gray-600">
                        Steer clear of overused topics and phrases that admissions officers see repeatedly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Don&apos;t try to impress</h3>
                      <p className="text-gray-600">
                        Focus on being genuine rather than trying to sound impressive with complex vocabulary.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="scholarship" className="mt-6 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Finding Scholarships</h2>

                <p className="mb-4">
                  There are many resources available to help you find scholarships that match your profile:
                </p>

                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>School counseling office</li>
                  <li>College financial aid websites</li>
                  <li>Scholarship search engines (Fastweb, Scholarships.com, etc.)</li>
                  <li>Community organizations and local businesses</li>
                  <li>Professional associations related to your intended field of study</li>
                  <li>Religious organizations</li>
                  <li>Employers (yours or your parents&apos;)</li>
                </ul>

                <Button>Scholarship Database</Button>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Scholarship Essay Tips</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Follow directions exactly</h3>
                      <p className="text-gray-600">
                        Pay close attention to word counts, formatting requirements, and submission guidelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Tailor each essay</h3>
                      <p className="text-gray-600">
                        Customize your essay for each scholarship to address their specific values and mission.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Proofread carefully</h3>
                      <p className="text-gray-600">
                        Errors can disqualify you. Have someone else review your essay before submitting.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="resume" className="mt-6 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resume Structure</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-blue-600">Contact Information</h3>
                    <p className="text-gray-600">
                      Include your name, phone number, email, and LinkedIn profile (if applicable).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-blue-600">Education</h3>
                    <p className="text-gray-600">List your schools, graduation dates, GPA, and relevant coursework.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-blue-600">Experience</h3>
                    <p className="text-gray-600">
                      Include work experience, internships, and volunteer positions with descriptions of your
                      responsibilities and achievements.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-blue-600">Skills</h3>
                    <p className="text-gray-600">
                      List relevant skills such as languages, computer programs, and technical abilities.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-blue-600">Activities & Leadership</h3>
                    <p className="text-gray-600">
                      Include extracurricular activities, clubs, sports, and leadership positions.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-blue-600">Awards & Honors</h3>
                    <p className="text-gray-600">
                      List any recognition you&apos;ve received, including academic awards and scholarships.
                    </p>
                  </div>
                </div>

                <Button className="mt-4">Download Resume Template</Button>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resume Do&apos;s and Don&apos;ts</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-green-600 mb-2">Do&apos;s</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Keep it to one page</li>
                      <li>Use action verbs</li>
                      <li>Quantify achievements when possible</li>
                      <li>Tailor your resume for each application</li>
                      <li>Use a clean, professional format</li>
                      <li>Proofread carefully</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-red-600 mb-2">Don&apos;ts</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Include personal information (age, marital status)</li>
                      <li>Use an unprofessional email address</li>
                      <li>Include references on your resume</li>
                      <li>Use fancy fonts or graphics</li>
                      <li>Include obvious skills (e.g., Microsoft Word)</li>
                      <li>Lie or exaggerate</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Need Personalized Help?</h2>
            <p className="mb-4">
              Our team offers one-on-one application review sessions to help you put your best foot forward. Schedule a
              meeting with one of our advisors for personalized feedback.
            </p>
            <Button>Schedule a Session</Button>
          </div>
        </main>
      </div>
    </>
  )
}

