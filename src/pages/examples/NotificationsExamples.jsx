import React, { useState, useEffect } from 'react';

const NotificationsExamples = () => {
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const showToastNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gradient">
            Notifications Examples
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl">
            Learn how to implement various notification patterns in React using state management and conditional rendering.
          </p>

          {/* Toast Notifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Toast Notifications</h2>
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Interactive Example</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Click the buttons below to see different types of toast notifications:
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => showToastNotification('Success! Operation completed.', 'success')}
                  className="btn-success"
                >
                  Success Toast
                </button>
                <button
                  onClick={() => showToastNotification('Warning! Please check your input.', 'warning')}
                  className="btn-warning"
                >
                  Warning Toast
                </button>
                <button
                  onClick={() => showToastNotification('Error! Something went wrong.', 'error')}
                  className="btn-danger"
                >
                  Error Toast
                </button>
                <button
                  onClick={() => showToastNotification('Info: Here\'s a helpful tip.', 'info')}
                  className="btn-info"
                >
                  Info Toast
                </button>
              </div>

              {/* Toast Notification Display */}
              {showToast && (
                <div className={`fixed top-20 right-4 z-50 animate-pulse ${
                  toastType === 'success' ? 'bg-green-500' :
                  toastType === 'warning' ? 'bg-yellow-500' :
                  toastType === 'error' ? 'bg-red-500' : 'bg-blue-500'
                } text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3`}>
                  <span className="font-medium">{toastMessage}</span>
                  <button
                    onClick={() => setShowToast(false)}
                    className="ml-4 text-white/80 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Alert Notifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Alert Notifications</h2>
            <div className="space-y-6">
              <div className="card border-l-4 border-green-500 bg-green-50 dark:bg-emerald-900/20 dark:border-emerald-500 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">Success Alert</h3>
                    <p className="mt-2 text-green-700">
                      Your changes have been saved successfully. The operation completed without any issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-yellow-500 bg-yellow-50 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-yellow-800">Warning Alert</h3>
                    <p className="mt-2 text-yellow-700">
                      Please review your input before proceeding. Some fields may require attention.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-red-500 bg-red-50 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800">Error Alert</h3>
                    <p className="mt-2 text-red-700">
                      Failed to process your request. Please check your connection and try again.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-blue-500 bg-blue-50 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-800">Info Alert</h3>
                    <p className="mt-2 text-blue-700">
                      This is an informational message that provides helpful context or guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Notification Stack</h2>
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Dynamic Notification Queue</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Add multiple notifications to see them stack and auto-dismiss:
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => addNotification('New user registered', 'info')}
                  className="btn-primary"
                >
                  Add Info
                </button>
                <button
                  onClick={() => addNotification('File uploaded successfully', 'success')}
                  className="btn-success"
                >
                  Add Success
                </button>
                <button
                  onClick={() => addNotification('System maintenance scheduled', 'warning')}
                  className="btn-warning"
                >
                  Add Warning
                </button>
                <button
                  onClick={() => addNotification('Connection lost', 'error')}
                  className="btn-danger"
                >
                  Add Error
                </button>
              </div>

              {/* Notification Stack Display */}
              <div className="fixed top-20 right-4 z-50 space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    } text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between space-x-3 min-w-[300px] animate-pulse`}
                  >
                    <span className="font-medium">{notification.message}</span>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-white/80 hover:text-white font-bold text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Implementation Examples</h2>
            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Basic Toast Component</h3>
                <pre className="bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-slate-300 p-4 rounded-xl overflow-x-auto">
                  <code>{`const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={\`\${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} 
                    text-white px-6 py-4 rounded-xl shadow-lg\`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};`}</code>
                </pre>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Notification Hook</h3>
                <pre className="bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-slate-300 p-4 rounded-xl overflow-x-auto">
                  <code>{`const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotificationsExamples;
