import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Lock, ArrowRight, Activity } from 'lucide-react';

const DashboardLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        setError('');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center text-white tracking-tight">System Access</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">Enter your credentials to view analytics</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-500 transition-all shadow-inner"
                placeholder="Admin Password"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg text-center animate-pulse">
                {error}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Portfolio Analytics</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </nav>
      <main className="p-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;
