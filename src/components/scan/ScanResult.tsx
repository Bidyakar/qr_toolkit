import React from 'react';
import {
  CopyIcon,
  ExternalLinkIcon,
  SaveIcon,
  RefreshCwIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { saveHistoryItem } from '../../lib/storage';
interface ScanResultProps {
  data: string;
  onReset: () => void;
}
export function ScanResult({ data, onReset }: ScanResultProps) {
  const { user } = useAuth();
  const isUrl = /^(http|https):\/\/[^ "]+$/.test(data);
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success('Copied to clipboard');
  };
  const handleSave = () => {
    if (!user) return;
    saveHistoryItem({
      userId: user.id,
      type: 'scan',
      content: data
    });
    toast.success('Saved to history');
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full max-w-lg mx-auto">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Scan Result</h3>
        <span className="px-2.5 py-1 bg-lime-100 text-lime-800 text-xs font-medium rounded-full">
          {isUrl ? 'URL' : 'Text'}
        </span>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 break-all">
        <p className="text-slate-700 font-medium">{data}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {isUrl &&
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors col-span-2">
          
            <ExternalLinkIcon className="w-4 h-4" />
            Open Link
          </a>
        }
        <button
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium rounded-lg transition-colors ${!isUrl ? 'col-span-2' : ''}`}>
          
          <CopyIcon className="w-4 h-4" />
          Copy
        </button>
        {isUrl &&
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium rounded-lg transition-colors">
          
            <SaveIcon className="w-4 h-4" />
            Save
          </button>
        }
      </div>

      {!isUrl &&
      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium rounded-lg transition-colors mb-6">
        
          <SaveIcon className="w-4 h-4" />
          Save to History
        </button>
      }

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-lime-300 hover:bg-lime-400 text-slate-950 text-sm font-semibold rounded-xl transition-colors">
        
        <RefreshCwIcon className="w-4 h-4" />
        Scan Another
      </button>
    </motion.div>);

}