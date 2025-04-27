"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Copy, CheckCircle } from "lucide-react";

export function CitationGenerator() {
  const [citationStyle, setCitationStyle] = useState<'mla' | 'apa' | 'chicago'>('mla');
  const [sourceType, setSourceType] = useState<'website' | 'book' | 'journal'>('website');
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    publishedYear: "",
    publisher: "",
    website: "",
    accessDate: "",
    journal: "",
    volume: "",
    pages: ""
  });
  const [citation, setCitation] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCitation = (e: React.FormEvent) => {
    e.preventDefault();
    let result = "";
    
    if (citationStyle === 'mla') {
      // MLA Format
      if (formData.author) result += `${formData.author}. `;
      result += `"${formData.title}." `;
      
      if (sourceType === 'website') {
        if (formData.website) result += `${formData.website}, `;
        if (formData.publishedYear) result += `${formData.publishedYear}, `;
        if (formData.accessDate) result += `Accessed ${formData.accessDate}.`;
      } else if (sourceType === 'book') {
        if (formData.publisher) result += `${formData.publisher}, `;
        if (formData.publishedYear) result += `${formData.publishedYear}.`;
      } else if (sourceType === 'journal') {
        if (formData.journal) result += `${formData.journal}, `;
        if (formData.volume) result += `vol. ${formData.volume}, `;
        if (formData.pages) result += `pp. ${formData.pages}, `;
        if (formData.publishedYear) result += `${formData.publishedYear}.`;
      }
    } else if (citationStyle === 'apa') {
      // APA Format
      if (formData.author) result += `${formData.author} `;
      if (formData.publishedYear) result += `(${formData.publishedYear}). `;
      result += `${formData.title}. `;
      
      if (sourceType === 'website') {
        if (formData.website) result += `${formData.website}.`;
      } else if (sourceType === 'book') {
        if (formData.publisher) result += `${formData.publisher}.`;
      } else if (sourceType === 'journal') {
        if (formData.journal) result += `${formData.journal}`;
        if (formData.volume) result += `, ${formData.volume}`;
        if (formData.pages) result += `, ${formData.pages}.`;
      }
    } else if (citationStyle === 'chicago') {
      // Chicago Format
      if (formData.author) result += `${formData.author}. `;
      result += `"${formData.title}." `;
      
      if (sourceType === 'website') {
        if (formData.website) result += `${formData.website}. `;
        if (formData.publishedYear) result += `${formData.publishedYear}. `;
        if (formData.accessDate) result += `Accessed ${formData.accessDate}.`;
      } else if (sourceType === 'book') {
        if (formData.publisher) result += `${formData.publisher}, `;
        if (formData.publishedYear) result += `${formData.publishedYear}.`;
      } else if (sourceType === 'journal') {
        if (formData.journal) result += `${formData.journal} `;
        if (formData.volume) result += `${formData.volume} `;
        if (formData.publishedYear) result += `(${formData.publishedYear}): `;
        if (formData.pages) result += `${formData.pages}.`;
      }
    }

    setCitation(result);
  };

  const copyToClipboard = () => {
    if (citation) {
      navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // More compact layout for grid
  return (
    <div className="w-full">
      {/* Compact header section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <Button 
            variant={citationStyle === 'mla' ? "default" : "outline"}
            onClick={() => setCitationStyle('mla')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            MLA
          </Button>
          <Button 
            variant={citationStyle === 'apa' ? "default" : "outline"}
            onClick={() => setCitationStyle('apa')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            APA
          </Button>
          <Button 
            variant={citationStyle === 'chicago' ? "default" : "outline"}
            onClick={() => setCitationStyle('chicago')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            Chicago
          </Button>
        </div>
        <div className="flex gap-1">
          <Button 
            type="button"
            variant={sourceType === 'website' ? "default" : "outline"}
            onClick={() => setSourceType('website')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            Web
          </Button>
          <Button 
            type="button"
            variant={sourceType === 'book' ? "default" : "outline"}
            onClick={() => setSourceType('book')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            Book
          </Button>
          <Button 
            type="button"
            variant={sourceType === 'journal' ? "default" : "outline"}
            onClick={() => setSourceType('journal')}
            className="text-xs h-7 px-2"
            size="sm"
          >
            Journal
          </Button>
        </div>
      </div>

      <form onSubmit={generateCitation} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input 
              name="author"
              placeholder="Author" 
              value={formData.author}
              onChange={handleInputChange}
              className="h-7 text-xs"
            />
          </div>

          <div>
            <Input 
              name="title"
              placeholder="Title" 
              value={formData.title}
              onChange={handleInputChange}
              required
              className="h-7 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input 
              name="publishedYear"
              placeholder="Year Published" 
              value={formData.publishedYear}
              onChange={handleInputChange}
              className="h-7 text-xs"
            />
          </div>

          {sourceType === 'website' && (
            <div>
              <Input 
                name="website"
                placeholder="Website Name" 
                value={formData.website}
                onChange={handleInputChange}
                className="h-7 text-xs"
              />
            </div>
          )}

          {sourceType === 'book' && (
            <div>
              <Input 
                name="publisher"
                placeholder="Publisher" 
                value={formData.publisher}
                onChange={handleInputChange}
                className="h-7 text-xs"
              />
            </div>
          )}

          {sourceType === 'journal' && (
            <div>
              <Input 
                name="journal"
                placeholder="Journal Name" 
                value={formData.journal}
                onChange={handleInputChange}
                className="h-7 text-xs"
              />
            </div>
          )}
        </div>

        {sourceType === 'website' && (
          <div>
            <Input 
              name="accessDate"
              type="text" 
              placeholder="Access Date (e.g., April 27, 2025)" 
              value={formData.accessDate}
              onChange={handleInputChange}
              className="h-7 text-xs"
            />
          </div>
        )}

        {sourceType === 'journal' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input 
                name="volume"
                placeholder="Volume/Issue" 
                value={formData.volume}
                onChange={handleInputChange}
                className="h-7 text-xs"
              />
            </div>

            <div>
              <Input 
                name="pages"
                placeholder="Pages (e.g., 45-67)" 
                value={formData.pages}
                onChange={handleInputChange}
                className="h-7 text-xs"
              />
            </div>
          </div>
        )}

        <Button type="submit" className="w-full h-7 text-xs">Generate Citation</Button>
      </form>

      {citation && (
        <div className="mt-2">
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md relative">
            <Textarea 
              className="min-h-[60px] bg-transparent text-xs" 
              value={citation} 
              readOnly 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6" 
              onClick={copyToClipboard}
            >
              {copied ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}