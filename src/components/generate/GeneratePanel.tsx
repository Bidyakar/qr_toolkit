import React, { useEffect, useState } from 'react';
import { CustomizationControls } from './CustomizationControls';
import { QRPreview } from './QRPreview';
import { downloadQR } from '../../lib/qr';
import { saveHistoryItem } from '../../lib/storage';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Settings2Icon, TypeIcon } from 'lucide-react';
export function GeneratePanel() {
  const [data, setData] = useState('');
  const [isAuto, setIsAuto] = useState(true);
  const [hasGenerated, setHasGenerated] = useState(false);
  // Customization state
  const [fgColor, setFgColor] = useState('#0B1220');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const { user } = useAuth();
  // Reset generated state when data changes in manual mode
  useEffect(() => {
    if (!isAuto) {
      setHasGenerated(false);
    }
  }, [data, isAuto]);
  const handleDownload = (format: 'png' | 'svg') => {
    if (!data) return;
    const targetId = format === 'png' ? 'qr-canvas' : 'qr-svg';
    downloadQR(targetId, format, `qr-${Date.now()}`);
    toast.success(`Downloaded as ${format.toUpperCase()}`);
  };
  const handleSave = () => {
    if (!user || !data) return;
    saveHistoryItem({
      userId: user.id,
      type: 'generate',
      content: data,
      settings: {
        fgColor,
        bgColor,
        size,
        level
      }
    });
    toast.success('Saved to history');
  };
  const handleManualGenerate = () => {
    if (!data) return;
    setHasGenerated(true);
  };
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TypeIcon className="w-5 h-5 text-slate-400" />
              Content
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">
                Auto-update
              </span>
              <button
                onClick={() => setIsAuto(!isAuto)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAuto ? 'bg-lime-400' : 'bg-slate-200'}`}>
                
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAuto ? 'translate-x-6' : 'translate-x-1'}`} />
                
              </button>
            </div>
          </div>

          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter URL, text, or any data..."
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none resize-none transition-all" />
          
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-6">
            <Settings2Icon className="w-5 h-5 text-slate-400" />
            Customization
          </h2>
          <CustomizationControls
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            size={size}
            setSize={setSize}
            level={level}
            setLevel={setLevel} />
          
        </div>
      </div>

      <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
        <QRPreview
          data={data}
          fgColor={fgColor}
          bgColor={bgColor}
          size={size}
          level={level}
          onDownload={handleDownload}
          onSave={handleSave}
          isAuto={isAuto}
          onManualGenerate={handleManualGenerate}
          hasGenerated={hasGenerated} />
        
      </div>
    </div>);

}