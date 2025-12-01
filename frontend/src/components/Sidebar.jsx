import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, History, Settings, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Sparkles, label: 'Tahmin Yap', path: '/dashboard/predict' },
    { icon: History, label: 'Geçmiş Tahminler', path: '/dashboard/history' },
    { icon: Settings, label: 'Ayarlar', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
            <BookOpen size={24} />
        </div>
        <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">LGS Tahmin</h1>
            <span className="text-xs text-gray-500">Paneli</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

