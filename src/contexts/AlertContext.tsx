import React, { createContext, useContext, useState, useCallback } from 'react';

interface AlertOptions {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  duration?: number;
  className?: string;
}

interface Alert {
  id: string;
  message: string | React.ReactNode;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible: boolean;
  duration: number;
  className: string;
  isVisible: boolean;
  createdAt: number;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (message: string | React.ReactNode, options?: AlertOptions) => string;
  hideAlert: (id: string) => void;
  clearAlerts: () => void;
  showSuccess: (message: string | React.ReactNode, options?: Omit<AlertOptions, 'type'>) => string;
  showError: (message: string | React.ReactNode, options?: Omit<AlertOptions, 'type'>) => string;
  showWarning: (message: string | React.ReactNode, options?: Omit<AlertOptions, 'type'>) => string;
  showInfo: (message: string | React.ReactNode, options?: Omit<AlertOptions, 'type'>) => string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const generateId = (): string => Math.random().toString(36).substr(2, 9);

  const showAlert = useCallback((message: string | React.ReactNode, options: AlertOptions = {}): string => {
    const {
      type = 'info',
      title,
      dismissible = true,
      duration = 0, // 0 means persistent (no auto-dismiss)
      className = ''
    } = options;

    const id = generateId();
    const newAlert: Alert = {
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

  const hideAlert = useCallback((id: string): void => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isVisible: false } : alert
    ));
    
    // Remove from array after animation
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 300);
  }, []);

  const clearAlerts = useCallback((): void => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isVisible: false })));
    
    // Remove all after animation
    setTimeout(() => {
      setAlerts([]);
    }, 300);
  }, []);

  const showSuccess = useCallback((message: string | React.ReactNode, options: Omit<AlertOptions, 'type'> = {}): string => {
    return showAlert(message, { ...options, type: 'success' });
  }, [showAlert]);

  const showError = useCallback((message: string | React.ReactNode, options: Omit<AlertOptions, 'type'> = {}): string => {
    return showAlert(message, { ...options, type: 'error' });
  }, [showAlert]);

  const showWarning = useCallback((message: string | React.ReactNode, options: Omit<AlertOptions, 'type'> = {}): string => {
    return showAlert(message, { ...options, type: 'warning' });
  }, [showAlert]);

  const showInfo = useCallback((message: string | React.ReactNode, options: Omit<AlertOptions, 'type'> = {}): string => {
    return showAlert(message, { ...options, type: 'info' });
  }, [showAlert]);

  const value: AlertContextType = {
    alerts,
    showAlert,
    hideAlert,
    clearAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};
