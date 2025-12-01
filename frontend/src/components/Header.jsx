import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, LogOut, Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

const Header = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
             {/* Breadcrumb or Page Title could go here */}
             <h2 className="text-gray-700 font-semibold">Panel</h2>
        </div>
      
      <div className="flex items-center gap-6 ml-auto">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center border border-amber-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} alt="Profile" className="w-8 h-8" />
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-700">{user?.username || 'Kullanıcı'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900">Hesabım</p>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/dashboard/settings')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2"
                    >
                        <SettingsIcon size={16} />
                        Ayarlar
                    </button>
                    
                    <div className="my-1 border-t border-gray-50"></div>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        Çıkış Yap
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
