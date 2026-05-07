import React from 'react';
import { HistoryItem as HistoryItemType } from '../../lib/storage';
import {
  QrCodeIcon,
  ScanLineIcon,
  CopyIcon,
  Trash2Icon,
  ExternalLinkIcon } from
'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
interface Props {
  item: HistoryItemType;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
}
export function HistoryItem({ item, onDelete, onCopy }: Props) {
  const date = new Date(item.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const isUrl = /^(http|https):\/\/[^ "]+$/.test(item.content);
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:items-center group">
      <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden">
        {item.type === 'generate' && item.settings ?
        <QRCodeSVG
          value={item.content}
          size={48}
          fgColor={item.settings.fgColor}
          bgColor={item.settings.bgColor}
          level={item.settings.level as any} /> :


        <ScanLineIcon className="w-8 h-8 text-slate-300" />
        }
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${item.type === 'generate' ? 'bg-lime-100 text-lime-800' : 'bg-blue-100 text-blue-800'}`}>
            
            {item.type === 'generate' ?
            <QrCodeIcon className="w-3 h-3" /> :

            <ScanLineIcon className="w-3 h-3" />
            }
            {item.type === 'generate' ? 'Generated' : 'Scanned'}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <p className="text-slate-900 font-medium truncate" title={item.content}>
          {item.content}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {isUrl &&
        <a
          href={item.content}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Open link">
          
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        }
        <button
          onClick={() => onCopy(item.content)}
          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Copy content">
          
          <CopyIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete">
          
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>);

}