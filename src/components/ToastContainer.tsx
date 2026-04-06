import React from 'react';
import { useToast } from '../contexts/ToastContext';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  const getToastClasses = (type: string): string => {
    const baseClasses = 'flex items-center gap-3 p-4 rounded-xl shadow-lg min-w-[320px] max-w-[400px] text-sm font-medium border backdrop-blur-sm transition-all duration-300 cursor-pointer';
    
    const typeClasses = {
      success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400/20',
      error: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400/20',
      warning: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400/20',
      info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400/20',
    };

    return `${baseClasses} ${typeClasses[type as keyof typeof typeClasses]}`;
  };

  const getIcon = (type: string): React.ReactElement => {
    const iconClasses = 'w-5 h-5 flex-shrink-0';

    switch (type) {
      case 'success':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast: ToastItem, index: number) => (
        <div
          key={toast.id}
          className={`
            ${getToastClasses(toast.type)}
            pointer-events-auto
            transform transition-all duration-300
            ${toast.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            ${index > 0 ? '-mt-2' : ''}
          `}
          onClick={() => hideToast(toast.id)}
        >
          {getIcon(toast.type)}
          <span className="flex-1 leading-tight">
            {toast.message}
          </span>
          <button
            className="background-transparent border-none text-white text-lg cursor-pointer p-1 ml-auto opacity-80 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              hideToast(toast.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
