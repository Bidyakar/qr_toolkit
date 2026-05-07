import React from 'react';
interface CustomizationControlsProps {
  fgColor: string;
  setFgColor: (c: string) => void;
  bgColor: string;
  setBgColor: (c: string) => void;
  size: number;
  setSize: (s: number) => void;
  level: 'L' | 'M' | 'Q' | 'H';
  setLevel: (l: 'L' | 'M' | 'Q' | 'H') => void;
}
const PRESETS = [
{
  name: 'Classic',
  fg: '#000000',
  bg: '#ffffff'
},
{
  name: 'Navy',
  fg: '#0B1220',
  bg: '#ffffff'
},
{
  name: 'Lime',
  fg: '#020617',
  bg: '#BEF264'
},
{
  name: 'Sunset',
  fg: '#7c2d12',
  bg: '#ffedd5'
}];

export function CustomizationControls({
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  size,
  setSize,
  level,
  setLevel
}: CustomizationControlsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Colors</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Foreground
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
              
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300" />
              
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
              
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300" />
              
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) =>
          <button
            key={preset.name}
            onClick={() => {
              setFgColor(preset.fg);
              setBgColor(preset.bg);
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
            
              <div
              className="w-3 h-3 rounded-full border border-slate-200"
              style={{
                background: `linear-gradient(135deg, ${preset.fg} 50%, ${preset.bg} 50%)`
              }} />
            
              {preset.name}
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-slate-900">Size</h3>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {size}px
          </span>
        </div>
        <input
          type="range"
          min="128"
          max="512"
          step="8"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full accent-lime-500" />
        
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>128px</span>
          <span>512px</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Error Correction
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {(['L', 'M', 'Q', 'H'] as const).map((l) =>
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`py-2 text-sm font-medium rounded-lg border transition-colors ${level === l ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
            
              {l}
            </button>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Higher levels allow the QR code to be read even if partially obscured
          or damaged.
        </p>
      </div>
    </div>);

}