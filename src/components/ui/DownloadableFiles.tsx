"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DownloadIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon, FileIcon, FileTextIcon, FileImageIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface DownloadableFile {
  name: string;
  path: string;
  description?: string;
  type: string; // e.g., "PPTX", "PNG", "PDF"
  category?: string; // Optional category field
}

interface DownloadableFilesProps {
  files: DownloadableFile[];
  title?: string;
  categories?: string[]; // Optional predefined categories
}

// Helper function to get file icon based on type
const getFileIcon = (type: string) => {
  const fileType = type.toLowerCase();
  if (fileType === 'pdf') return <FileTextIcon size={18} className="text-red-500" />;
  if (fileType === 'docx' || fileType === 'doc') return <FileTextIcon size={18} className="text-blue-500" />;
  if (fileType === 'pptx' || fileType === 'ppt') return <FileTextIcon size={18} className="text-orange-500" />;
  if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') return <FileImageIcon size={18} className="text-purple-500" />;
  return <FileIcon size={18} className="text-gray-500" />;
};

export function DownloadableFiles({ files, title = "Downloadable Resources", categories }: DownloadableFilesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [groupedFiles, setGroupedFiles] = useState<Record<string, DownloadableFile[]>>({});

  // Determine categories and group files
  useEffect(() => {
    // Filter files based on search query
    const filtered = files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredFiles(filtered);

    // Group files by category or type if no category is provided
    const grouped: Record<string, DownloadableFile[]> = {};
    
    // Use provided categories or determine from files
    const fileCategories = categories || 
      [...new Set(filtered.map(file => file.category || file.type))];
    
    // Initialize open state for each category (default first one open)
    const initialOpenState: Record<string, boolean> = {};
    
    fileCategories.forEach((category, index) => {
      grouped[category] = filtered.filter(file => 
        (file.category || file.type) === category
      );
      
      // Open the first category by default if openCategories is empty
      if (Object.keys(openCategories).length === 0) {
        initialOpenState[category] = index === 0;
      }
    });
    
    setGroupedFiles(grouped);
    
    // Only set initial open state on first render
    if (Object.keys(openCategories).length === 0) {
      setOpenCategories(initialOpenState);
    }
  }, [files, searchQuery, categories]);

  // Toggle category accordion
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon size={16} className="text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search resources..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Files grouped by category in accordions */}
      <div className="space-y-4">
        {Object.keys(groupedFiles).length > 0 ? (
          Object.entries(groupedFiles).map(([category, categoryFiles]) => (
            <div key={category} className="border rounded-md overflow-hidden">
              <button
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <span className="font-medium">{category}</span>
                {openCategories[category] ? (
                  <ChevronUpIcon size={18} />
                ) : (
                  <ChevronDownIcon size={18} />
                )}
              </button>
              
              {openCategories[category] && categoryFiles.length > 0 && (
                <div className="divide-y">
                  {categoryFiles.map((file, index) => (
                    <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">{getFileIcon(file.type)}</div>
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          {file.description && (
                            <p className="text-sm text-gray-600">{file.description}</p>
                          )}
                          <span className="inline-block mt-1 text-xs bg-gray-100 px-2 py-1 rounded">
                            {file.type}
                          </span>
                        </div>
                      </div>
                      <Link href={file.path} download>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <DownloadIcon size={16} />
                          Download
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {openCategories[category] && categoryFiles.length === 0 && (
                <div className="p-4 text-gray-500 text-center">
                  No files available in this category
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No resources match your search
          </div>
        )}
      </div>
    </Card>
  );
}