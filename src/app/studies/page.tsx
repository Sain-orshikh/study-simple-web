"use client"

import Sidebar from "@/components/sidebar/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpenIcon, FileTextIcon, DownloadIcon, SearchIcon, Globe as GlobeIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { ResourcesModal } from "@/components/ui/ResourcesModal"
import { igcseSubjects } from "@/data/studies/subjects"
import { alevelSubjects } from "@/data/studies/alevel-subjects"

export default function StudiesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);

  const filteredIgcseSubjects = igcseSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.includes(searchQuery)
  );

  const filteredAlevelSubjects = alevelSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.includes(searchQuery)
  );

  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <main className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Cambridge Study Resources</h1>
                <p className="text-gray-600 mt-2">
                  Access study materials for Cambridge IGCSE, AS and A Level courses
                </p>
              </div>
              <div className="relative w-full md:w-auto">
                <div className="flex items-center relative">
                  <SearchIcon className="h-4 w-4 absolute left-3 text-gray-400" />
                  <Input
                    className="pl-9 pr-4 py-2 w-full md:w-[300px]"
                    placeholder="Search by subject name or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <Tabs defaultValue="igcse">
                <TabsList className="flex w-full md:w-fit">
                  <TabsTrigger
                    value="igcse"
                    className="w-full flex-1 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md py-3 transition-all duration-200 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                  >
                    <div className="w-full flex items-center justify-center space-x-2">
                      <BookOpenIcon className="h-4 w-4" />
                      <span className="font-medium">IGCSE</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="alevel"
                    className="w-full flex-1 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md py-3 transition-all duration-200 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <GlobeIcon className="h-4 w-4" />
                      <span className="font-medium">AS & A Level</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="igcse" className="mt-6">
                  {filteredIgcseSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIgcseSubjects.map((subject) => (
                        <Card key={subject.id} className="p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                              {subject.icon}
                            </div>
                            <div className="ml-3">
                              <h2 className="text-xl font-semibold">{subject.name}</h2>
                              <p className="text-sm text-gray-500">Code: {subject.code}</p>
                            </div>
                          </div>

                          {subject.resources.length > 0 ? (
                            <div className="mb-4">
                              <ul className="space-y-3 mb-2">
                                {subject.resources.slice(0, 3).map((resource, index) => (
                                  <li key={index} className="flex items-center">
                                    <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm truncate max-w-[170px]">{resource.name}</span>
                                    <a 
                                      href={resource.url}
                                      download
                                      className="ml-auto"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <DownloadIcon className="h-4 w-4" />
                                      </Button>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              {subject.resources.length > 3 && (
                                <p className="text-xs text-gray-500 italic">
                                  +{subject.resources.length - 3} more resources
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 mb-4">
                              Resources coming soon. Check back later!
                            </p>
                          )}

                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setModalOpen(true);
                            }}
                          >
                            View All Resources
                          </Button>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <BookOpenIcon className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No subjects match your search</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="alevel" className="mt-6">
                  {filteredAlevelSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAlevelSubjects.map((subject) => (
                        <Card key={subject.id} className="p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                              {subject.icon}
                            </div>
                            <div className="ml-3">
                              <h2 className="text-xl font-semibold">{subject.name}</h2>
                              <p className="text-sm text-gray-500">Code: {subject.code}</p>
                            </div>
                          </div>

                          {subject.resources.length > 0 ? (
                            <div className="mb-4">
                              <ul className="space-y-3 mb-2">
                                {subject.resources.slice(0, 3).map((resource, index) => (
                                  <li key={index} className="flex items-center">
                                    <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-sm truncate max-w-[170px]">{resource.name}</span>
                                    <a 
                                      href={resource.url}
                                      download
                                      className="ml-auto"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <DownloadIcon className="h-4 w-4" />
                                      </Button>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              {subject.resources.length > 3 && (
                                <p className="text-xs text-gray-500 italic">
                                  +{subject.resources.length - 3} more resources
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 mb-4">
                              Resources coming soon. Check back later!
                            </p>
                          )}

                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setModalOpen(true);
                            }}
                          >
                            View All Resources
                          </Button>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <BookOpenIcon className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No subjects match your search</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Resources Information
              </h2>
              <p className="mb-4">
                These study resources are designed to help students preparing for Cambridge IGCSE, AS, and A Level examinations.
                All materials are available for download in PDF format.
              </p>
              <p className="text-sm text-gray-600">
                Last updated: April 2025
              </p>
            </div>
          </main>
        </div>
      </Sidebar>

      {selectedSubject && (
        <ResourcesModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          subject={selectedSubject}
        />
      )}
    </>
  );
}

