
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  RotateCw
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  scale: number;
  onPageChange: (newPage: number) => void;
  onZoomChange: (newScale: number) => void;
  onRotate: () => void;
  onDownload: () => void;
  pdfUrl: string | null;
}

const PDFControls: React.FC<PDFControlsProps> = ({
  currentPage,
  totalPages,
  scale,
  onPageChange,
  onZoomChange,
  onRotate,
  onDownload,
  pdfUrl
}) => {
  return (
    <div className="w-full bg-white shadow-md rounded-md p-2 flex flex-wrap justify-between items-center gap-2 sticky top-0 z-10">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="mx-2 flex items-center">
          <span className="text-sm font-medium">
            {currentPage} / {totalPages || 1}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 mx-2 hidden sm:block" />
      
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onZoomChange(scale - 0.2)} 
          disabled={scale <= 0.6}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <div className="mx-2 flex items-center">
          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onZoomChange(scale + 0.2)} 
          disabled={scale >= 2.5}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 mx-2 hidden sm:block" />

      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRotate}
        >
          <RotateCw className="h-4 w-4" />
        </Button>

        <Button 
          variant="outline" 
          size="icon" 
          className="ml-2" 
          onClick={onDownload}
          disabled={!pdfUrl}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PDFControls;
