import React from 'react';
import { useToast } from '../contexts/ToastContext';

const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  const getToastStyles = (type) => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      minWidth: '320px',
      maxWidth: '400px',
      fontSize: '14px',
      fontWeight: '500',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease-in-out',
      transform: 'translateX(0)',
      opacity: 1,
    };

    const typeStyles = {
      success: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
      },
      error: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
      },
      info: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
      },
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = (type) => {
    const iconStyles = {
      width: '20px',
      height: '20px',
      flexShrink: 0,
    };

    switch (type) {
      case 'success':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg style={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const containerStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    pointerEvents: 'none',
  };

  const toastStyles = (toast, index) => ({
    ...getToastStyles(toast.type),
    pointerEvents: 'auto',
    cursor: 'pointer',
    opacity: toast.isVisible ? 1 : 0,
    transform: toast.isVisible ? 'translateX(0)' : 'translateX(100%)',
    marginBottom: index === 0 ? 0 : '-8px', // Stack effect
  });

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: 'auto',
    opacity: 0.8,
    transition: 'opacity 0.2s',
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div style={containerStyles}>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={toastStyles(toast, index)}
          onClick={() => hideToast(toast.id)}
        >
          {getIcon(toast.type)}
          <span style={{ flex: 1, lineHeight: '1.4' }}>
            {toast.message}
          </span>
          <button
            style={closeButtonStyles}
            onClick={(e) => {
              e.stopPropagation();
              hideToast(toast.id);
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
