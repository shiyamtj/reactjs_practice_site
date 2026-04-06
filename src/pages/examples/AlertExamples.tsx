import React, { useState } from 'react';
import { useAlert } from '../../contexts/AlertContext';
import Alert from '../../components/Alert';
import PageLayout from '../../components/PageLayout';

const AlertExamples: React.FC = () => {
  const { showAlert, showSuccess, showWarning, showError, showInfo } = useAlert();
  const [showInlineAlert, setShowInlineAlert] = useState<boolean>(false);

  const handleShowSuccess = (): void => {
    showSuccess('Operation completed successfully!', {
      title: 'Success',
      duration: 5000
    });
  };

  const handleShowWarning = (): void => {
    showWarning('Please review your input before proceeding.', {
      title: 'Warning',
      duration: 5000
    });
  };

  const handleShowError = (): void => {
    showError('Failed to save changes. Please try again.', {
      title: 'Error',
      duration: 5000
    });
  };

  const handleShowInfo = (): void => {
    showInfo('A new update is available for download.', {
      title: 'Information',
      duration: 5000
    });
  };

  const handleShowPersistent = (): void => {
    showAlert('This alert will stay visible until manually dismissed.', {
      title: 'Persistent Alert',
      type: 'info',
      duration: 0 // No auto-dismiss
    });
  };

  const handleShowCustom = (): void => {
    showAlert('Custom styled alert with additional content.', {
      title: 'Custom Alert',
      type: 'success',
      className: 'border-2 border-green-400'
    });
  };

  const handleShowWithChildren = (): void => {
    showAlert(
      <div>
        <p className="font-semibold mb-2">Alert with Custom Content</p>
        <p className="text-sm opacity-90">This alert contains custom React elements as children.</p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors">
            Action 1
          </button>
          <button className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors">
            Action 2
          </button>
        </div>
      </div>,
      {
        title: 'Custom Children',
        type: 'info',
        duration: 8000
      }
    );
  };

  return (
    <PageLayout 
      title="Alert Component Examples"
      description="Explore different types of alerts, customizations, and usage patterns."
      maxWidth="max-w-6xl"
    >
      <div className="space-y-12">
        {/* Basic Alerts */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Basic Alert Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleShowSuccess}
              className="btn-success p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold">Success Alert</div>
              <div className="text-sm opacity-75">Show success message</div>
            </button>
            
            <button
              onClick={handleShowWarning}
              className="btn-warning p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-semibold">Warning Alert</div>
              <div className="text-sm opacity-75">Show warning message</div>
            </button>
            
            <button
              onClick={handleShowError}
              className="btn-danger p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">❌</div>
              <div className="font-semibold">Error Alert</div>
              <div className="text-sm opacity-75">Show error message</div>
            </button>
            
            <button
              onClick={handleShowInfo}
              className="btn-info p-4 rounded-xl text-center group"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className="font-semibold">Info Alert</div>
              <div className="text-sm opacity-75">Show info message</div>
            </button>
          </div>
        </section>

        {/* Advanced Examples */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Advanced Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleShowPersistent}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold mb-2">Persistent Alert</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Alert that doesn't auto-dismiss
              </div>
            </button>
            
            <button
              onClick={handleShowCustom}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold mb-2">Custom Styled</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Alert with custom CSS classes
              </div>
            </button>
            
            <button
              onClick={handleShowWithChildren}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🧩</div>
              <div className="font-semibold mb-2">Custom Children</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Alert with React components
              </div>
            </button>
          </div>
        </section>

        {/* Inline Alert Example */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Inline Alert</h3>
          <div className="space-y-4">
            <button
              onClick={() => setShowInlineAlert(!showInlineAlert)}
              className="btn-primary"
            >
              {showInlineAlert ? 'Hide' : 'Show'} Inline Alert
            </button>
            
            {showInlineAlert && (
              <Alert
                type="info"
                title="Inline Alert"
                message="This is an inline alert component rendered directly in the DOM."
                dismissible
                onDismiss={() => setShowInlineAlert(false)}
              />
            )}
          </div>
        </section>

        {/* Code Examples */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Usage Examples</h3>
          <div className="space-y-6">
            <div className="card p-6">
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Basic Usage</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useAlert } from '../contexts/AlertContext';

const { showSuccess, showError, showWarning, showInfo } = useAlert();

// Show different types of alerts
showSuccess('Operation completed!');
showError('Something went wrong');
showWarning('Please review your input');
showInfo('New update available');`}
              </pre>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-50">Advanced Usage</h4>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Show alert with options
showAlert('Custom message', {
  title: 'Custom Title',
  type: 'success',
  duration: 5000,
  className: 'custom-class',
  dismissible: true
});

// Show alert with custom children
showAlert(
  <div>
    <p>Custom content</p>
    <button>Action Button</button>
  </div>,
  {
    title: 'Custom Alert',
    type: 'info'
  }
);`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AlertExamples;
