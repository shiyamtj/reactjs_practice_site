import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import PageLayout from '../../components/PageLayout';

const ToastExamples = () => {
  const { showToast, hideToast, clearToasts } = useToast();
  const [customMessage, setCustomMessage] = useState('');
  const [customDuration, setCustomDuration] = useState(3000);

  const handleBasicToast = (type) => {
    const messages = {
      success: 'Success! Operation completed successfully.',
      warning: 'Warning! Please review your input.',
      error: 'Error! Something went wrong.',
      info: 'Info: Here\'s a helpful tip.'
    };
    showToast(messages[type], type);
  };

  const handleToastWithTitle = (type) => {
    const messages = {
      success: { message: 'Data saved successfully!', title: 'Success' },
      warning: { message: 'Session will expire in 5 minutes.', title: 'Warning' },
      error: { message: 'Failed to upload file.', title: 'Error' },
      info: { message: 'New features available.', title: 'Information' }
    };
    showToast(messages[type].message, type, 5000);
  };

  const handlePersistentToast = () => {
    showToast('This toast will stay until manually dismissed.', 'info', 0);
  };

  const handleCustomToast = () => {
    if (customMessage.trim()) {
      showToast(customMessage, 'success', parseInt(customDuration) || 3000);
      setCustomMessage('');
    }
  };

  const handleMultipleToasts = () => {
    showToast('First toast', 'info', 2000);
    setTimeout(() => showToast('Second toast', 'warning', 3000), 500);
    setTimeout(() => showToast('Third toast', 'success', 4000), 1000);
  };

  const handleClearAll = () => {
    clearToasts();
  };

  return (
    <PageLayout 
      title="Toast Examples"
      description="Learn how to use toast notifications for user feedback and system messages."
      maxWidth="max-w-4xl"
    >

      {/* Basic Toast Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Toast Notifications</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Click the buttons to see different types of toast notifications:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleBasicToast('success')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={() => handleBasicToast('warning')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={() => handleBasicToast('error')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Error Toast
            </button>
            <button
              onClick={() => handleBasicToast('info')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Info Toast
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Toast Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Toast Examples</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Explore advanced toast notification features:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => handleToastWithTitle('success')}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              Success with Title
            </button>
            <button
              onClick={() => handleToastWithTitle('warning')}
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
            >
              Warning with Title
            </button>
            <button
              onClick={() => handleToastWithTitle('error')}
              className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
            >
              Error with Title
            </button>
            <button
              onClick={() => handleToastWithTitle('info')}
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
            >
              Info with Title
            </button>
            <button
              onClick={handlePersistentToast}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Persistent Toast
            </button>
            <button
              onClick={handleMultipleToasts}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              Multiple Toasts
            </button>
          </div>
        </div>
      </section>

      {/* Custom Toast */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Custom Toast</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Create a custom toast with your own message and duration:</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your custom message"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (milliseconds)
              </label>
              <input
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3000"
                min="0"
              />
            </div>
            <button
              onClick={handleCustomToast}
              className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Show Custom Toast
            </button>
          </div>
        </div>
      </section>

      {/* Toast Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Toast Management</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Control toast notifications programmatically:</p>
          <div className="flex gap-4">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear All Toasts
            </button>
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">1. Import and use the toast hook:</h3>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`import { useToast } from '../contexts/ToastContext';

function MyComponent() {
  const { showToast, hideToast, clearToasts } = useToast();
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Show toast notifications:</h3>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`// Basic usage
showToast('Operation successful!', 'success');

// With custom duration (in milliseconds)
showToast('Warning message', 'warning', 5000);

// Persistent toast (no auto-dismiss)
showInfo('Important information', 'info', 0);`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Toast types available:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="bg-gray-200 px-1 rounded">success</code> - Green toast for successful operations</li>
              <li><code className="bg-gray-200 px-1 rounded">warning</code> - Yellow toast for cautionary messages</li>
              <li><code className="bg-gray-200 px-1 rounded">error</code> - Red toast for error messages</li>
              <li><code className="bg-gray-200 px-1 rounded">info</code> - Blue toast for informational messages</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Toast management:</h3>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`// Hide a specific toast (requires toast ID)
hideToast(toastId);

// Clear all active toasts
clearToasts();`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Best Practices</h2>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use <strong>success</strong> toasts for completed operations and achievements</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use <strong>warning</strong> toasts for cautionary messages that don't block the user</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use <strong>error</strong> toasts for problems that need user attention</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use <strong>info</strong> toasts for helpful tips and system updates</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Keep messages concise and actionable</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use appropriate durations (3-5 seconds for most messages)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Consider using persistent toasts for critical information</span>
          </li>
        </ul>
      </section>
    </PageLayout>
  );
};

export default ToastExamples;
