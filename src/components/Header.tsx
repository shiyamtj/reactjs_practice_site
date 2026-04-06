import React from 'react';
import reactIcon from '../assets/react.svg';
import Menu from './Menu';
import SkipLink from './SkipLink';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  menuItems?: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Welcome', 
  subtitle = 'Simple Home Page',
  menuItems = [] 
}) => {
  return (
    <>
      <SkipLink />
      <header 
        className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-slate-800 dark:to-slate-900 text-white shadow-lg backdrop-blur-sm z-50"
        role="banner"
      >
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300" aria-hidden="true">
                <img src={reactIcon} alt="" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold m-0 tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm m-0 opacity-90 font-medium">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Menu items={menuItems} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
