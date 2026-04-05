import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Menu = ({ items = [], className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState(new Set());
  const timeoutRef = useRef(null);

  const handleSubmenuEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubmenus(prev => new Set([...prev, index]));
  };

  const handleSubmenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenus(new Set());
    }, 150);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenSubmenus(new Set());
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderMenuItem = (item, index, isSubmenu = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenus.has(index);

    return (
      <li
        key={index}
        className={`relative ${isSubmenu ? 'w-full' : ''}`}
        onMouseEnter={!isSubmenu && hasSubmenu ? () => handleSubmenuEnter(index) : undefined}
        onMouseLeave={!isSubmenu && hasSubmenu ? handleSubmenuLeave : undefined}
      >
        <a
          href={item.href || '#'}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault();
              if (isSubmenu) {
                toggleSubmenu(index);
              }
            }
          }}
          className={`
            block px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-all duration-200
            ${isSubmenu ? 'w-full text-left' : ''}
            ${hasSubmenu ? 'flex items-center justify-between' : ''}
          `}
        >
          <span className="font-medium">{item.label}</span>
          {hasSubmenu && (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </a>

        {hasSubmenu && (
          <ul
            className={`
              ${isSubmenu 
                ? `mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`
                : `absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-50 ${isSubmenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`
              }
            `}
          >
            {item.submenu.map((subItem, subIndex) => (
              <li key={`${index}-${subIndex}`}>
                <a
                  href={subItem.href || '#'}
                  className={`
                    block px-4 py-2 transition-colors duration-200
                    ${isSubmenu 
                      ? 'text-white/90 hover:bg-white/10 hover:text-white rounded-xl' 
                      : 'text-gray-800 hover:bg-indigo-50 hover:text-indigo-600'
                    }
                  `}
                >
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={`${className}`}>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center space-x-2">
        {items.map((item, index) => renderMenuItem(item, index))}
      </ul>

      {/* Mobile menu */}
      <div
        className={`
          lg:hidden fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-600 via-purple-600 to-purple-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] rounded-l-2xl
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => renderMenuItem(item, index, true))}
          </ul>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[50]"
          style={{ paddingTop: '4rem' }}
          onClick={toggleMobileMenu}
        />
      )}
    </nav>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      submenu: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string,
        })
      ),
    })
  ),
  className: PropTypes.string,
};

export default Menu;
