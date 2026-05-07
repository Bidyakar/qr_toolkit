import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCodeIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      login(email, name);
      toast.success('Account created successfully!');
      navigate('/dashboard', {
        replace: true
      });
    }, 600);
  };
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-lime-300 p-2 rounded-xl group-hover:bg-lime-400 transition-colors">
                <QrCodeIcon className="w-8 h-8 text-slate-950" />
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Create an account
          </h2>
          <p className="text-center text-slate-500 mb-8">
            Start generating and scanning QR codes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="John Doe"
                required />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="you@example.com"
                required />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-lime-300 focus:border-lime-400 outline-none transition-all bg-slate-50 focus:bg-white pr-10"
                  placeholder="••••••••"
                  required
                  minLength={6} />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  
                  {showPassword ?
                  <EyeOffIcon className="w-5 h-5" /> :

                  <EyeIcon className="w-5 h-5" />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-lime-300 hover:bg-lime-400 text-slate-950 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              
              {isLoading ? 'Creating account...' : 'Create account'}
              {!isLoading && <ArrowRightIcon className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-slate-900 hover:underline">
              
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>);

}