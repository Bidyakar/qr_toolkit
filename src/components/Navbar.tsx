import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCodeIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to={user ? '/dashboard' : '/'}
            className="flex items-center gap-2 group">
            
            <div className="bg-lime-300 p-1.5 rounded-lg group-hover:bg-lime-400 transition-colors">
              <QrCodeIcon className="w-6 h-6 text-slate-950" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-950">
              QRLab
            </span>
          </Link>

          {user ?
          <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                  <UserIcon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-100">
              
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div> :

          <div className="flex items-center gap-3">
              <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
              
                Log in
              </Link>
              <Link
              to="/signup"
              className="text-sm font-medium bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
              
                Sign up
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>);

}