import React, { useEffect, useState } from 'react';
import {
  getUserHistory,
  deleteHistoryItem,
  HistoryItem as HistoryItemType } from
'../../lib/storage';
import { useAuth } from '../../context/AuthContext';
import { HistoryItem } from './HistoryItem';
import { SearchIcon, HistoryIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
export function HistoryPanel() {
  const { user } = useAuth();
  const [items, setItems] = useState<HistoryItemType[]>([]);
  const [filter, setFilter] = useState<'all' | 'generate' | 'scan'>('all');
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (user) {
      setItems(getUserHistory(user.id));
    }
  }, [user]);
  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setItems(items.filter((item) => item.id !== id));
    toast.success('Item deleted');
  };
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };
  const filteredItems = items.filter((item) => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (search && !item.content.toLowerCase().includes(search.toLowerCase()))
    return false;
    return true;
  });
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <HistoryIcon className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No history yet
        </h3>
        <p className="text-slate-500 max-w-sm">
          Your generated and scanned QR codes will appear here automatically
          when you save them.
        </p>
      </div>);

  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none transition-all shadow-sm" />
          
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
          {(['all', 'generate', 'scan'] as const).map((f) =>
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${filter === f ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
            
              {f}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) =>
          <motion.div
            key={item.id}
            layout
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            transition={{
              duration: 0.2
            }}>
            
              <HistoryItem
              item={item}
              onDelete={handleDelete}
              onCopy={handleCopy} />
            
            </motion.div>
          )}
        </AnimatePresence>

        {filteredItems.length === 0 &&
        <div className="text-center py-12 text-slate-500">
            No items match your search.
          </div>
        }
      </div>
    </div>);

}