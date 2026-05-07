import React, { useState } from 'react';
import { CameraScanner } from './CameraScanner';
import { ImageScanner } from './ImageScanner';
import { ScanResult } from './ScanResult';
import { CameraIcon, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function ScanPanel() {
  const [mode, setMode] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<string | null>(null);
  if (result) {
    return <ScanResult data={result} onReset={() => setResult(null)} />;
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-2 rounded-xl border border-slate-200 flex mb-8 shadow-sm">
        <button
          onClick={() => setMode('camera')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'camera' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
          
          <CameraIcon className="w-4 h-4" />
          Camera
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'image' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
          
          <ImageIcon className="w-4 h-4" />
          Image Upload
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.2
            }}
            className="w-full">
            
            {mode === 'camera' ?
            <CameraScanner onScanSuccess={setResult} /> :

            <ImageScanner onScanSuccess={setResult} />
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}