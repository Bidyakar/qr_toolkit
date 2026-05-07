import React, { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { UploadIcon, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
interface ImageScannerProps {
  onScanSuccess: (decodedText: string) => void;
}
export function ImageScanner({ onScanSuccess }: ImageScannerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    setIsProcessing(true);
    try {
      const html5QrCode = new Html5Qrcode('hidden-reader');
      const decodedText = await html5QrCode.scanFile(file, true);
      onScanSuccess(decodedText);
      toast.success('QR Code found!');
    } catch (err) {
      console.error(err);
      toast.error('No QR code found in this image');
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <div id="hidden-reader" className="hidden"></div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          flex flex-col items-center justify-center p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all
          ${isDragging ? 'border-lime-500 bg-lime-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && processFile(e.target.files[0])}
          accept="image/*"
          className="hidden" />
        

        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <UploadIcon className="w-8 h-8 text-slate-400" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          {isProcessing ? 'Scanning image...' : 'Upload an image'}
        </h3>
        <p className="text-sm text-slate-500 text-center">
          Drag and drop or click to browse files
        </p>
      </div>
    </div>);

}