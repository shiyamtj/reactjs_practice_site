import React from 'react';
import { useAlert } from '../contexts/AlertContext';
import Alert from './Alert';

const AlertContainer: React.FC = () => {
  const { alerts, hideAlert } = useAlert();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {alerts.map((alert: any) => (
        <div
          key={alert.id}
          className={`transition-all duration-300 transform ${
            alert.isVisible 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}
        >
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            dismissible={alert.dismissible}
            onDismiss={() => hideAlert(alert.id)}
            className={alert.className}
          />
        </div>
      ))}
    </div>
  );
};

export default AlertContainer;
