import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import CreateDonationForm from './components/CreateDonationForm';
import MyRequestsAndDonations from './components/MyRequestsAndDonations';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {session && <Navbar session={session} />}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4">
          <Routes>
            <Route path="/" element={!session ? <Auth /> : <Dashboard session={session} />} />
            <Route path="/dashboard" element={!session ? <Navigate to="/" /> : <Dashboard session={session} />} />
            <Route path="/create" element={!session ? <Navigate to="/" /> : <CreateDonationForm session={session} />} />
            <Route path="/my-panel" element={!session ? <Navigate to="/" /> : <MyRequestsAndDonations session={session} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
