import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = generateId();
    const newToast = {
      id,
      message,
      type,
      isVisible: true,
      createdAt: Date.now()
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const clearToasts = useCallback(() => {
    setToasts(prev => prev.map(toast => ({ ...toast, isVisible: false })));
    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  const value = {
    toasts,
    showToast,
    hideToast,
    clearToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
