
import React, { useState } from 'react';
import PDFUpload from '../components/PDFUpload';
import PDFViewer from '../components/PDFViewer';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Index = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setPdfFile(file);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center">
          <FileText className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">PDF Reader</h1>
        </header>

        {!pdfFile ? (
          <Card className="mb-8">
            <CardContent className="p-6">
              <PDFUpload onFileChange={handleFileChange} />
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800 truncate flex-1">
                {pdfFile.name}
              </h2>
              <button 
                onClick={() => setPdfFile(null)}
                className="text-blue-500 hover:underline text-sm"
              >
                Upload different file
              </button>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <PDFViewer file={pdfFile} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
