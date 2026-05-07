import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  QrCodeIcon,
  ScanLineIcon,
  ZapIcon,
  ShieldCheckIcon } from
'lucide-react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
export function Landing() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.5
                }}>
                
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 text-lime-800 text-sm font-medium mb-6">
                  <ZapIcon className="w-4 h-4" />
                  Fast, Free, and Secure
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight mb-6">
                  The ultimate{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-600">
                    QR Code
                  </span>{' '}
                  toolkit.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10">
                  Generate beautiful, custom QR codes in seconds. Scan instantly
                  from your camera or upload an image. Manage everything in one
                  clean dashboard.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto px-8 py-4 bg-lime-300 hover:bg-lime-400 text-slate-950 font-semibold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                    
                    <QrCodeIcon className="w-5 h-5" />
                    Start Generating
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl transition-all shadow-sm border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2">
                    
                    <ScanLineIcon className="w-5 h-5" />
                    Scan a Code
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<QrCodeIcon className="w-6 h-6" />}
                title="Custom Generation"
                description="Create QR codes for links, text, or contact info. Customize colors, sizes, and error correction levels." />
              
              <FeatureCard
                icon={<ScanLineIcon className="w-6 h-6" />}
                title="Instant Scanning"
                description="Scan directly from your webcam or upload an image containing a QR code to extract data instantly." />
              
              <FeatureCard
                icon={<ShieldCheckIcon className="w-6 h-6" />}
                title="Secure History"
                description="Keep track of all your generated and scanned codes in a private, locally-stored history dashboard." />
              
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-lime-300 p-1 rounded-md">
              <QrCodeIcon className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              QRLab
            </span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} QRLab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>);

}
function FeatureCard({
  icon,
  title,
  description




}: {icon: React.ReactNode;title: string;description: string;}) {
  return (
    <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-900 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>);

}