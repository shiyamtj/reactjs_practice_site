import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const showAlert = useCallback((message, options = {}) => {
    const {
      type = 'info',
      title,
      dismissible = true,
      duration = 0, // 0 means persistent (no auto-dismiss)
      className = ''
    } = options;

    const id = generateId();
    const newAlert = {
      id,
      message,
      type,
      title,
      dismissible,
      duration,
      className,
      isVisible: true,
      createdAt: Date.now()
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto-dismiss after duration if duration > 0
    if (duration > 0) {
      setTimeout(() => {
        hideAlert(id);
      }, duration);
    }

    return id;
  }, []);

  const hideAlert = useCallback((id) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isVisible: false } : alert
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 300);
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isVisible: false })));
    setTimeout(() => {
      setAlerts([]);
    }, 300);
  }, []);

  // Convenience methods for different alert types
  const showSuccess = useCallback((message, options = {}) => {
    return showAlert(message, { ...options, type: 'success' });
  }, [showAlert]);

  const showWarning = useCallback((message, options = {}) => {
    return showAlert(message, { ...options, type: 'warning' });
  }, [showAlert]);

  const showError = useCallback((message, options = {}) => {
    return showAlert(message, { ...options, type: 'error' });
  }, [showAlert]);

  const showInfo = useCallback((message, options = {}) => {
    return showAlert(message, { ...options, type: 'info' });
  }, [showAlert]);

  const value = {
    alerts,
    showAlert,
    hideAlert,
    clearAlerts,
    showSuccess,
    showWarning,
    showError,
    showInfo
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
