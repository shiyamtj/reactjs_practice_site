import React, { useState } from 'react';
import { useAlert } from '../../contexts/AlertContext';
import Alert from '../../components/Alert';
import PageLayout from '../../components/PageLayout';

const AlertExamples = () => {
  const { showAlert, showSuccess, showWarning, showError, showInfo } = useAlert();
  const [showInlineAlert, setShowInlineAlert] = useState(false);

  const handleShowSuccess = () => {
    showSuccess('Operation completed successfully!', {
      title: 'Success',
      duration: 5000
    });
  };

  const handleShowWarning = () => {
    showWarning('Please review your input before proceeding.', {
      title: 'Warning',
      duration: 5000
    });
  };

  const handleShowError = () => {
    showError('Failed to save changes. Please try again.', {
      title: 'Error',
      duration: 5000
    });
  };

  const handleShowInfo = () => {
    showInfo('A new update is available for download.', {
      title: 'Information',
      duration: 5000
    });
  };

  const handleShowPersistent = () => {
    showAlert('This alert will stay visible until manually dismissed.', {
      title: 'Persistent Alert',
      type: 'info',
      duration: 0 // No auto-dismiss
    });
  };

  const handleShowCustom = () => {
    showAlert('Custom styled alert with additional content.', {
      title: 'Custom Alert',
      type: 'success',
      className: 'border-2 border-green-400'
    });
  };

  return (
    <PageLayout 
      title="Alert Component Examples"
      description="Comprehensive alert component examples showcasing different types, patterns, and usage scenarios."
      maxWidth="max-w-4xl"
    >
      
      <div className="space-y-6">
        {/* Toast-style Alerts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Toast-style Alerts (using AlertContext)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={handleShowSuccess}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Show Success
            </button>
            <button
              onClick={handleShowWarning}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Show Warning
            </button>
            <button
              onClick={handleShowError}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Show Error
            </button>
            <button
              onClick={handleShowInfo}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Show Info
            </button>
            <button
              onClick={handleShowPersistent}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Show Persistent
            </button>
            <button
              onClick={handleShowCustom}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              Show Custom
            </button>
          </div>
        </section>

        {/* Inline Alerts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Inline Alerts</h2>
          <div className="space-y-4">
            <Alert
              type="success"
              title="Success"
              message="Your profile has been updated successfully."
            />
            
            <Alert
              type="warning"
              title="Warning"
              message="Your session will expire in 5 minutes."
            />
            
            <Alert
              type="error"
              title="Error"
              message="Failed to upload file. Please check the file format."
              dismissible
              onDismiss={() => console.log('Alert dismissed')}
            />
            
            <Alert
              type="info"
              title="Information"
              message="New features have been added to the dashboard."
            />

            <Alert
              type="success"
              title="Alert with Children"
              message="This alert contains custom content."
            >
              <div className="mt-3 pt-3 border-t border-green-200">
                <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Take Action
                </button>
              </div>
            </Alert>
          </div>
        </section>

        {/* Conditional Inline Alert */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Conditional Alert</h2>
          <button
            onClick={() => setShowInlineAlert(!showInlineAlert)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors mb-4"
          >
            {showInlineAlert ? 'Hide' : 'Show'} Conditional Alert
          </button>
          
          {showInlineAlert && (
            <Alert
              type="info"
              title="Conditional Alert"
              message="This alert is shown based on a condition."
              dismissible
              onDismiss={() => setShowInlineAlert(false)}
            />
          )}
        </section>

        {/* Usage Instructions */}
        <section className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Wrap your app with AlertProvider:</h3>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`import { AlertProvider } from './contexts/AlertContext';
import AlertContainer from './components/AlertContainer';

function App() {
  return (
    <AlertProvider>
      <YourApp />
      <AlertContainer />
    </AlertProvider>
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2. Use the alert hook in your components:</h3>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`import { useAlert } from './contexts/AlertContext';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useAlert();
  
  const handleSubmit = () => {
    try {
      // Your logic here
      showSuccess('Operation successful!');
    } catch (error) {
      showError('Something went wrong');
    }
  };
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Use inline Alert component directly:</h3>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`import Alert from './components/Alert';

<Alert
  type="warning"
  title="Warning"
  message="Please review your input"
  dismissible
  onDismiss={() => setShowAlert(false)}
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AlertExamples;
