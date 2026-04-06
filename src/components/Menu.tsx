import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

interface MenuProps {
  items?: MenuItem[];
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ items = [], className = '' }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<number>>(new Set());
  const timeoutRef = useRef<number | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, index: number, hasSubmenu: boolean): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (hasSubmenu) {
          event.preventDefault();
          toggleSubmenu(index);
        }
        break;
      case 'Escape':
        if (openSubmenus.has(index)) {
          event.preventDefault();
          setOpenSubmenus(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Focus next menu item
        const nextElement = event.currentTarget.parentElement?.nextElementSibling?.querySelector('a');
        if (nextElement) (nextElement as HTMLElement).focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Focus previous menu item
        const prevElement = event.currentTarget.parentElement?.previousElementSibling?.querySelector('a');
        if (prevElement) (prevElement as HTMLElement).focus();
        break;
    }
  };

  const handleSubmenuEnter = (index: number): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubmenus(prev => new Set([...prev, index]));
  };

  const handleSubmenuLeave = (): void => {
    timeoutRef.current = window.setTimeout(() => {
      setOpenSubmenus(new Set());
    }, 150);
  };

  const toggleSubmenu = (index: number): void => {
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

  const toggleMobileMenu = (): void => {
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

  const renderMenuItem = (item: MenuItem, index: number, isSubmenu: boolean = false): React.ReactElement => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenus.has(index);
    const submenuId = `submenu-${index}`;
    const buttonId = `menu-button-${index}`;

    return (
      <li
        key={index}
        className={`relative ${isSubmenu ? 'w-full' : ''}`}
        onMouseEnter={!isSubmenu && hasSubmenu ? () => handleSubmenuEnter(index) : undefined}
        onMouseLeave={!isSubmenu && hasSubmenu ? handleSubmenuLeave : undefined}
      >
        <Link
          id={buttonId}
          to={item.href || '#'}
          aria-haspopup={hasSubmenu ? 'menu' : undefined}
          aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
          aria-controls={hasSubmenu ? submenuId : undefined}
          onKeyDown={(e) => hasSubmenu && handleKeyDown(e, index, true)}
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
            ${!isSubmenu && location.pathname === item.href ? 'bg-white/20' : ''}
          `}
        >
          <span className="font-medium">{item.label}</span>
          {hasSubmenu && (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </Link>

        {hasSubmenu && (
          <ul
            id={submenuId}
            role="menu"
            aria-labelledby={buttonId}
            className={`
              ${isSubmenu 
                ? `mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`
                : `absolute top-full left-0 mt-1 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-50 ${isSubmenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`
              }
            `}
          >
            {(item.submenu || []).map((subItem, subIndex) => (
              <li key={`${index}-${subIndex}`} role="none">
                <Link
                  to={subItem.href || '#'}
                  role="menuitem"
                  className={`
                    block px-4 py-2 transition-colors duration-200
                    ${isSubmenu 
                      ? 'text-white/90 hover:bg-white/10 hover:text-white rounded-xl' 
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600'
                    }
                    ${location.pathname === subItem.href ? (isSubmenu ? 'bg-white/20 text-white' : 'bg-slate-50 dark:bg-slate-700 text-indigo-600') : ''}
                  `}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={`${className}`} role="navigation" aria-label="Main navigation">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center space-x-2" role="menubar">
        {items.map((item, index) => renderMenuItem(item, index))}
      </ul>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-600 via-purple-600 to-purple-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] rounded-l-2xl
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Navigation Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2" role="menu">
            {items.map((item, index) => renderMenuItem(item, index, true))}
          </ul>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[50] pt-16"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Menu;
