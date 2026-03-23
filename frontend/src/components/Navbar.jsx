import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LogOut, Home, PlusCircle, User } from 'lucide-react';

export default function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white shadow relative z-10 w-full">
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
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4 font-medium hidden md:block">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
