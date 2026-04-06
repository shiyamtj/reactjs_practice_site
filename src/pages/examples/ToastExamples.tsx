import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import PageLayout from '../../components/PageLayout';

const ToastExamples: React.FC = () => {
  const { showToast, hideToast, clearToasts } = useToast();
  const [customMessage, setCustomMessage] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<number>(3000);

  const handleBasicToast = (type: 'success' | 'warning' | 'error' | 'info'): void => {
    const messages = {
      success: 'Success! Operation completed successfully.',
      warning: 'Warning! Please review your input.',
      error: 'Error! Something went wrong.',
      info: 'Info: Here\'s a helpful tip.'
    };
    showToast(messages[type], type);
  };

  const handleToastWithTitle = (type: 'success' | 'warning' | 'error' | 'info'): void => {
    const messages = {
      success: { message: 'Data saved successfully!', title: 'Success' },
      warning: { message: 'Session will expire in 5 minutes.', title: 'Warning' },
      error: { message: 'Failed to upload file.', title: 'Error' },
      info: { message: 'New features available.', title: 'Information' }
    };
    showToast(messages[type].message, type, 5000);
  };

  const handlePersistentToast = (): void => {
    showToast('This toast will stay until manually dismissed.', 'info', 0);
  };

  const handleCustomToast = (): void => {
    if (customMessage.trim()) {
      showToast(customMessage, 'success', customDuration || 3000);
      setCustomMessage('');
    }
  };

  const handleMultipleToasts = (): void => {
    showToast('First toast', 'info', 2000);
    setTimeout(() => showToast('Second toast', 'warning', 3000), 500);
    setTimeout(() => showToast('Third toast', 'success', 4000), 1000);
  };

  const handleClearAll = (): void => {
    clearToasts();
  };

  return (
    <PageLayout 
      title="Toast Component Examples"
      description="Explore different types of toast notifications, timing controls, and advanced features."
      maxWidth="max-w-6xl"
    >
      <div className="space-y-12">
        {/* Basic Toast Types */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Basic Toast Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleBasicToast('success')}
              className="btn-success p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold">Success Toast</div>
              <div className="text-sm opacity-75">Show success message</div>
            </button>
            
            <button
              onClick={() => handleBasicToast('warning')}
              className="btn-warning p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-semibold">Warning Toast</div>
              <div className="text-sm opacity-75">Show warning message</div>
            </button>
            
            <button
              onClick={() => handleBasicToast('error')}
              className="btn-danger p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-semibold">Error Toast</div>
              <div className="text-sm opacity-75">Show error message</div>
            </button>
            
            <button
              onClick={() => handleBasicToast('info')}
              className="btn-info p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className="font-semibold">Info Toast</div>
              <div className="text-sm opacity-75">Show info message</div>
            </button>
          </div>
        </section>

        {/* Advanced Examples */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Advanced Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handlePersistentToast}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold mb-2">Persistent Toast</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Toast that doesn't auto-dismiss
              </div>
            </button>
            
            <button
              onClick={handleMultipleToasts}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold mb-2">Multiple Toasts</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Show multiple toasts in sequence
              </div>
            </button>
            
            <button
              onClick={handleClearAll}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🧹</div>
              <div className="font-semibold mb-2">Clear All</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Dismiss all active toasts
              </div>
            </button>
          </div>
        </section>

        {/* Custom Toast Builder */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Custom Toast Builder</h3>
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter custom message"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (ms)</label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  min="0"
                  max="10000"
                  step="1000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleCustomToast}
                  disabled={!customMessage.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Show Custom Toast
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Duration: {customDuration}ms ({customDuration === 0 ? 'No auto-dismiss' : `${customDuration / 1000}s`})
            </div>
          </div>
        </section>

        {/* Timing Examples */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Timing Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => showToast('Quick message', 'info', 1000)}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="font-semibold mb-1">1 Second</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Very short duration</div>
            </button>
            
            <button
              onClick={() => showToast('Standard message', 'success', 3000)}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="font-semibold mb-1">3 Seconds</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Default duration</div>
            </button>
            
            <button
              onClick={() => showToast('Longer message', 'warning', 5000)}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="font-semibold mb-1">5 Seconds</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Extended duration</div>
            </button>
            
            <button
              onClick={() => showToast('Important message', 'error', 8000)}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="font-semibold mb-1">8 Seconds</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Long duration</div>
            </button>
          </div>
        </section>

        {/* Code Examples */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Usage Examples</h3>
          <div className="space-y-6">
            <div className="card p-6">
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Basic Usage</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useToast } from '../contexts/ToastContext';

const { showToast } = useToast();

// Show different types of toasts
showToast('Success message', 'success');
showToast('Error message', 'error');
showToast('Warning message', 'warning');
showToast('Info message', 'info');`}
              </pre>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Advanced Usage</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Show toast with custom duration
showToast('Custom message', 'success', 5000);

// Show persistent toast (no auto-dismiss)
showToast('Important message', 'error', 0);

// Clear all toasts
clearToasts();

// Hide specific toast
hideToast(toastId);`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ToastExamples;
