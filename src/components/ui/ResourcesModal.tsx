"use client"

import React, { useState, useEffect } from "react"
import { Modal, Box } from "@mui/material"
import { Button } from "@/components/ui/button"
import { FileTextIcon, DownloadIcon, ExternalLinkIcon, X, BookOpen, Map, Lightbulb, Smartphone } from "lucide-react"
import { useMediaQuery } from '@mui/material'

interface Resource {
  id: string;
  name: string;
  description?: string;
  type: string;
  url: string;
  category?: string;
}

interface Subject {
  id: string;
  code: string;
  name: string;
  icon: React.ReactNode;
  resources: Resource[];
}

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
}

export function ResourcesModal({ isOpen, onClose, subject }: ResourcesModalProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showResourcesList, setShowResourcesList] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  
  // Group resources by category
  const theoryResources = subject.resources.filter(resource => resource.category === 'theory');
  const mindMapResources = subject.resources.filter(resource => resource.category === 'mindmap');
  const tipsResources = subject.resources.filter(resource => resource.category === 'tips');
  const notesResources = subject.resources.filter(resource => resource.category === 'notes');
  const bookFilesResources = subject.resources.filter(resource => resource.category === 'book&files');
  const vocabularyResources = subject.resources.filter(resource => resource.category === 'vocabulary');
  const caseStudyResources = subject.resources.filter(resource => resource.category === 'case-study');
  const uncategorizedResources = subject.resources.filter(resource => !resource.category || 
    (resource.category !== 'theory' && 
     resource.category !== 'mindmap' && 
     resource.category !== 'tips' &&
     resource.category !== 'notes' &&
     resource.category !== 'book&files' &&
     resource.category !== 'vocabulary' &&
     resource.category !== 'case-study'));
  
  // Handle orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      // Force re-render on orientation change
      setShowResourcesList(true);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);
  
  // Select the first resource when the modal opens
  useEffect(() => {
    if (isOpen && subject.resources.length > 0) {
      setSelectedResource(subject.resources[0]);
      setShowResourcesList(true);
    }
  }, [isOpen, subject.resources]);

  // Helper function to render the category icon
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'theory':
        return <BookOpen className="h-4 w-4 mr-2 text-blue-500" />;
      case 'mindmap':
        return <Map className="h-4 w-4 mr-2 text-purple-500" />;
      case 'tips':
        return <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />;
      case 'notes':
        return <FileTextIcon className="h-4 w-4 mr-2 text-green-500" />;
      case 'book&files':
        return <BookOpen className="h-4 w-4 mr-2 text-orange-500" />;
      case 'vocabulary':
        return <FileTextIcon className="h-4 w-4 mr-2 text-indigo-500" />;
      case 'case-study':
        return <FileTextIcon className="h-4 w-4 mr-2 text-pink-500" />;
      default:
        return <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };
  
  // Helper function to get category title
  const getCategoryTitle = (category?: string) => {
    switch (category) {
      case 'theory':
        return 'Theory';
      case 'mindmap':
        return 'Mind Maps';
      case 'tips':
        return 'Tips & Exam Preparation';
      case 'notes':
        return 'Notes';
      case 'book&files':
        return 'Books & Files';
      case 'vocabulary':
        return 'Vocabulary';
      case 'case-study':
        return 'Case Studies';
      default:
        return 'Other Resources';
    }
  };

  const toggleResourcesList = () => {
    if (isMobile) {
      setShowResourcesList(!showResourcesList);
    }
  };
  
  return (
    <Modal 
      open={isOpen} 
      onClose={onClose}
      aria-labelledby="resources-modal"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '900px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1,
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">{subject.name} Resources</h2>
            <button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-1 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-[calc(90vh-140px)]`}>
            {/* Resources List */}
            <div className={`${isMobile ? 'w-full' : 'w-1/3 border-r'} overflow-auto p-4`}>
              <h3 className="font-medium mb-3">Available Resources</h3>
              
              {subject.resources.length > 0 ? (
                <div className="space-y-6">
                  {/* Theory Resources */}
                  {theoryResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                        <h4 className="text-sm font-semibold text-blue-700">Theory</h4>
                      </div>
                      <ul className="space-y-2">
                        {theoryResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => {
                              setSelectedResource(resource);
                              if (isMobile) {
                                // On mobile, just select the resource but don't try to show the preview
                                // The resource details will appear in the mobile view below
                              }
                            }}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes Resources */}
                  {notesResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <FileTextIcon className="h-4 w-4 mr-2 text-green-500" />
                        <h4 className="text-sm font-semibold text-green-700">Notes</h4>
                      </div>
                      <ul className="space-y-2">
                        {notesResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Books & Files Resources */}
                  {bookFilesResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-4 w-4 mr-2 text-orange-500" />
                        <h4 className="text-sm font-semibold text-orange-700">Books & Files</h4>
                      </div>
                      <ul className="space-y-2">
                        {bookFilesResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-orange-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Vocabulary Resources */}
                  {vocabularyResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <FileTextIcon className="h-4 w-4 mr-2 text-indigo-500" />
                        <h4 className="text-sm font-semibold text-indigo-700">Vocabulary</h4>
                      </div>
                      <ul className="space-y-2">
                        {vocabularyResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-indigo-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Case Study Resources */}
                  {caseStudyResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <FileTextIcon className="h-4 w-4 mr-2 text-pink-500" />
                        <h4 className="text-sm font-semibold text-pink-700">Case Studies</h4>
                      </div>
                      <ul className="space-y-2">
                        {caseStudyResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-pink-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mind Map Resources */}
                  {mindMapResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Map className="h-4 w-4 mr-2 text-purple-500" />
                        <h4 className="text-sm font-semibold text-purple-700">Mind Maps</h4>
                      </div>
                      <ul className="space-y-2">
                        {mindMapResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips Resources */}
                  {tipsResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                        <h4 className="text-sm font-semibold text-amber-700">Tips & Exam Preparation</h4>
                      </div>
                      <ul className="space-y-2">
                        {tipsResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Uncategorized Resources */}
                  {uncategorizedResources.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <h4 className="text-sm font-semibold text-gray-700">Other Resources</h4>
                      </div>
                      <ul className="space-y-2">
                        {uncategorizedResources.map((resource) => (
                          <li 
                            key={resource.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedResource?.id === resource.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setSelectedResource(resource)}
                          >
                            <div className="flex items-start">
                              <FileTextIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                              <div>
                                <h5 className="font-medium">{resource.name}</h5>
                                {resource.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic py-4 text-center">
                  No resources available yet
                </p>
              )}
            </div>

            {/* Mobile Selected Resource Details */}
            {isMobile && selectedResource && (
              <div className="border-t p-4">
                <div className="mb-4">
                  <div className="flex items-center">
                    {getCategoryIcon(selectedResource.category)}
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {getCategoryTitle(selectedResource.category)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mt-1">{selectedResource.name}</h3>
                  {selectedResource.description && (
                    <p className="text-sm text-gray-600 mt-2">{selectedResource.description}</p>
                  )}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start">
                    <Smartphone className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium block mb-1">Preview not available on mobile</span>
                      Use the buttons below to view or download this file.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={selectedResource.url} 
                    download
                    className="flex-1"
                  >
                    <Button className="w-full">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </a>
                  <a 
                    href={selectedResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </a>
                </div>
              </div>
            )}

            {/* Preview Section - Desktop Only */}
            {!isMobile && (
              <div className="w-2/3 p-4 flex flex-col overflow-hidden">
                {selectedResource ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="flex items-center">
                          {getCategoryIcon(selectedResource.category)}
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {getCategoryTitle(selectedResource.category)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mt-1">{selectedResource.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={selectedResource.url} 
                          download
                          className="inline-flex"
                        >
                          <Button size="sm" variant="outline">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </a>
                        <a 
                          href={selectedResource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button size="sm" variant="outline">
                            <ExternalLinkIcon className="h-4 w-4 mr-2" />
                            Open
                          </Button>
                        </a>
                      </div>
                    </div>
                    
                    {/* PDF Viewer - Desktop Only */}
                    <div className="flex-1 border rounded-lg overflow-hidden bg-gray-100">
                      {selectedResource.type === 'pdf' ? (
                        <iframe
                          src={`${selectedResource.url}#view=FitH`}
                          className="w-full h-full border-0"
                          title={selectedResource.name}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center p-6">
                            <FileTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">This file type cannot be previewed directly.</p>
                            <div className="flex justify-center space-x-3">
                              <a 
                                href={selectedResource.url} 
                                download
                                className="inline-flex"
                              >
                                <Button>
                                  <DownloadIcon className="h-4 w-4 mr-2" />
                                  Download File
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <FileTextIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Select a resource</h3>
                      <p className="text-gray-500 text-sm">
                        Choose a resource from the list to preview its contents
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  )
}