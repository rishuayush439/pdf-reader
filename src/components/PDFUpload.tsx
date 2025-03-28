
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface PDFUploadProps {
  onFileChange: (file: File) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onFileChange }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  }, [onFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  }, [onFileChange]);

  return (
    <div 
      className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload PDF Document</h3>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Drag and drop a PDF file here, or click to select a file
      </p>
      <Button
        variant="outline"
        className="relative"
      >
        Select PDF File
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleFileChange}
          accept="application/pdf"
        />
      </Button>
    </div>
  );
};

export default PDFUpload;
