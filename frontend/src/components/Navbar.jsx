import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LogOut, Home, PlusCircle, User, Menu, X } from 'lucide-react';

export default function Navbar({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white shadow relative z-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600">
              YTÜ Ekosistem
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Home className="w-4 h-4 mr-2" />
                İlanlar
              </Link>
              <Link to="/create" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <PlusCircle className="w-4 h-4 mr-2" />
                Bağış Yap
              </Link>
              <Link to="/my-panel" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <User className="w-4 h-4 mr-2" />
                Panelim
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 mr-2 font-medium hidden md:block">{session?.user?.email}</span>
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </button>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1 shadow-lg">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium flex items-center">
              <Home className="w-5 h-5 mr-3" />
              İlanlar
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/create" className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium flex items-center">
              <PlusCircle className="w-5 h-5 mr-3" />
              Bağış Yap
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/my-panel" className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium flex items-center">
              <User className="w-5 h-5 mr-3" />
              Panelim
            </Link>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-4 flex items-center mb-2">
                <div className="text-sm font-medium text-gray-800 break-all">{session?.user?.email}</div>
              </div>
              <div className="space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Çıkış
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
