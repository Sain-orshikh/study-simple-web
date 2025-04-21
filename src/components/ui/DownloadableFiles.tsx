import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

interface DownloadableFile {
  name: string;
  path: string;
  description?: string;
  type: string; // e.g., "PPTX", "PNG", "PDF"
}

interface DownloadableFilesProps {
  files: DownloadableFile[];
  title?: string;
}

export function DownloadableFiles({ files, title = "Downloadable Resources" }: DownloadableFilesProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
            <div>
              <h3 className="font-medium">{file.name}</h3>
              {file.description && <p className="text-sm text-gray-600">{file.description}</p>}
              <span className="inline-block mt-1 text-xs bg-gray-100 px-2 py-1 rounded">{file.type}</span>
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
    </Card>
  );
}