import React from 'react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Delete', 
  cancelText = 'Cancel',
  type = 'danger' 
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      confirmBg: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/20'
    },
    warning: {
      confirmBg: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20'
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-200 dark:border-slate-700 shadow-2xl">
        {/* Icon */}
        <div className={`w-16 h-16 ${currentStyle.borderColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <svg className={`w-8 h-8 ${currentStyle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">{title}</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all duration-200 text-slate-900 dark:text-slate-50 font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 ${currentStyle.confirmBg} rounded-xl transition-all duration-200 text-white font-medium shadow-lg hover:shadow-xl`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
