
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import PDFControls from './PDFControls';

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setPageNumber(1); // Reset to first page when loading a new PDF
      setScale(1); // Reset zoom
      setRotation(0); // Reset rotation

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    toast({
      title: "PDF Loaded Successfully",
      description: `Document has ${numPages} page${numPages > 1 ? 's' : ''}.`,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage);
    }
  };

  const handleZoomChange = (newScale: number) => {
    setScale(newScale);
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = file?.name || 'document.pdf';
      link.click();
    }
  };

  if (!file) {
    return null;
  }

  return (
    <div className="w-full">
      <PDFControls
        currentPage={pageNumber}
        totalPages={numPages || 0}
        scale={scale}
        onPageChange={handlePageChange}
        onZoomChange={handleZoomChange}
        onRotate={handleRotate}
        onDownload={handleDownload}
        pdfUrl={pdfUrl}
      />

      <div className="pdf-container mt-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="loading-container">
              <Loader2 className="loading-spinner" />
              <p>Loading PDF...</p>
            </div>
          }
          error={
            <div className="error-container">
              <p className="text-red-500 font-medium">Failed to load PDF. Please ensure it's a valid PDF document.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <div className="loading-container">
                <Loader2 className="loading-spinner" />
                <p>Loading page {pageNumber}...</p>
              </div>
            }
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
