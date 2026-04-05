import React from 'react';
import PropTypes from 'prop-types';
import reactIcon from '../assets/react.svg';
import Menu from './Menu';

const Header = ({ 
  title = 'Welcome', 
  subtitle = 'Simple Home Page',
  menuItems = [] 
}) => {

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg backdrop-blur-sm z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <img src={reactIcon} alt="Brand Icon" className="w-8 h-8 object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold m-0 tracking-tight">{title}</h1>
              <p className="text-sm m-0 opacity-90 font-medium">{subtitle}</p>
            </div>
          </div>
          <Menu items={menuItems} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  menuItems: PropTypes.array
};

export default Header;
