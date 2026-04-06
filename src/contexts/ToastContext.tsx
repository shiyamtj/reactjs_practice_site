import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
  createdAt: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number) => string;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = (): string => Math.random().toString(36).substr(2, 9);

  const showToast = useCallback((
    message: string, 
    type: 'info' | 'success' | 'warning' | 'error' = 'info', 
    duration: number = 3000
  ): string => {
    const id = generateId();
    const newToast: Toast = {
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

  const hideToast = useCallback((id: string): void => {
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

  const clearToasts = useCallback((): void => {
    setToasts(prev => prev.map(toast => ({ ...toast, isVisible: false })));
    
    // Remove all after animation
    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  const value: ToastContextType = {
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
