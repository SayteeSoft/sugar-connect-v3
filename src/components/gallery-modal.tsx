'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryModalProps {
  images: string[];
  startIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryModal({ images, startIndex, isOpen, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'ArrowLeft') {
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        } else if (e.key === 'Escape') {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/90 border-0 shadow-none text-white flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">Image Gallery</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain animate-in fade-in"
          />
        </div>

        <button
          className="absolute top-4 right-4 text-white rounded-full bg-black/50 p-2 hover:bg-white/20 hover:text-white transition-colors z-50"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white rounded-full bg-black/50 p-2 hover:bg-white/20 hover:text-white transition-colors z-50"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous Image</span>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white rounded-full bg-black/50 p-2 hover:bg-white/20 hover:text-white transition-colors z-50"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
               <span className="sr-only">Next Image</span>
            </button>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-50">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
