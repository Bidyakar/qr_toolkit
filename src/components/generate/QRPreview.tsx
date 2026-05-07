import React from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { DownloadIcon, SaveIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface QRPreviewProps {
  data: string;
  fgColor: string;
  bgColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  onDownload: (format: 'png' | 'svg') => void;
  onSave: () => void;
  isAuto: boolean;
  onManualGenerate?: () => void;
  hasGenerated?: boolean;
}
export function QRPreview({
  data,
  fgColor,
  bgColor,
  size,
  level,
  onDownload,
  onSave,
  isAuto,
  onManualGenerate,
  hasGenerated
}: QRPreviewProps) {
  const showPreview = isAuto ? !!data : hasGenerated;
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 h-full min-h-[400px]">
      {showPreview ?
      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25
        }}
        className="flex flex-col items-center w-full">
        
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 relative group">
            {/* Hidden SVG for download purposes */}
            <div className="hidden">
              <QRCodeSVG
              id="qr-svg"
              value={data || ' '}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              includeMargin={true} />
            
            </div>

            {/* Visible Canvas */}
            <QRCodeCanvas
            id="qr-canvas"
            value={data || ' '}
            size={Math.min(size, 250)} // Scale down visually for preview if size is large
            fgColor={fgColor}
            bgColor={bgColor}
            level={level}
            includeMargin={true}
            className="rounded-md"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '250px'
            }} />
          
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-xs">
            <button
            onClick={() => onDownload('png')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors">
            
              <DownloadIcon className="w-4 h-4" />
              PNG
            </button>
            <button
            onClick={() => onDownload('svg')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-sm font-medium rounded-lg transition-colors">
            
              <DownloadIcon className="w-4 h-4" />
              SVG
            </button>
            <button
            onClick={onSave}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-lime-300 hover:bg-lime-400 text-slate-950 text-sm font-medium rounded-lg transition-colors mt-1">
            
              <SaveIcon className="w-4 h-4" />
              Save to History
            </button>
          </div>
        </motion.div> :

      <div className="text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-200 rounded-xl mb-4 flex items-center justify-center opacity-50">
            <div className="w-16 h-16 border-4 border-dashed border-slate-400 rounded-lg" />
          </div>
          <p className="text-slate-500 font-medium mb-4">
            {isAuto ?
          'Enter data to preview QR code' :
          'Enter data and click generate'}
          </p>
          {!isAuto &&
        <button
          onClick={onManualGenerate}
          disabled={!data}
          className="px-6 py-2.5 bg-lime-300 hover:bg-lime-400 disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-semibold rounded-lg transition-colors">
          
              Generate QR Code
            </button>
        }
        </div>
      }
    </div>);

}