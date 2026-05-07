import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { GeneratePanel } from '../components/generate/GeneratePanel';
import { ScanPanel } from '../components/scan/ScanPanel';
import { HistoryPanel } from '../components/history/HistoryPanel';
import { QrCodeIcon, ScanLineIcon, HistoryIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
type Tab = 'generate' | 'scan' | 'history';
export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('generate');
  const tabs = [
  {
    id: 'generate',
    label: 'Generate',
    icon: QrCodeIcon
  },
  {
    id: 'scan',
    label: 'Scan',
    icon: ScanLineIcon
  },
  {
    id: 'history',
    label: 'History',
    icon: HistoryIcon
  }] as
  const;
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-2xl w-fit mx-auto sm:mx-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                  
                  {isActive &&
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6
                    }} />

                  }
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>);

            })}
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
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
              }}>
              
              {activeTab === 'generate' && <GeneratePanel />}
              {activeTab === 'scan' && <ScanPanel />}
              {activeTab === 'history' && <HistoryPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>);

}