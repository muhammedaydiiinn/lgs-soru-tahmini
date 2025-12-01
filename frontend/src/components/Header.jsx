import React from 'react';
import { Bell, User, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
             {/* Dynamic based on page, but hardcoded for now as per design */}
        </div>
      
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <button className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center border border-amber-200">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet" alt="Profile" className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;

