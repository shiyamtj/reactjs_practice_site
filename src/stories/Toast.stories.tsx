import { Meta, StoryObj } from '@storybook/react';
import Toast from '../components/Toast';
import React from 'react';

interface ToastItem {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration: number;
}

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toast notification component with auto-dismiss functionality and different types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display in the toast',
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of toast notification',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds (0 to disable)',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when toast is closed',
    },
  },
};

export default meta;

export const Info: StoryObj<typeof Toast> = {
  args: {
    message: 'This is an informational message',
    type: 'info',
    duration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Info type toast notification.',
      },
    },
  },
};

export const Success: StoryObj<typeof Toast> = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
    duration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Success type toast notification.',
      },
    },
  },
};

export const Warning: StoryObj<typeof Toast> = {
  args: {
    message: 'Please review your input before proceeding',
    type: 'warning',
    duration: 4000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning type toast notification.',
      },
    },
  },
};

export const Error: StoryObj<typeof Toast> = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
    duration: 6000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error type toast notification.',
      },
    },
  },
};

export const LongMessage: StoryObj<typeof Toast> = {
  args: {
    message: 'This is a longer toast message that demonstrates how the component handles text that wraps to multiple lines while maintaining proper layout and readability.',
    type: 'info',
    duration: 8000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with a long message that wraps to multiple lines.',
      },
    },
  },
};

export const Persistent: StoryObj<typeof Toast> = {
  args: {
    message: 'This toast will not auto-dismiss',
    type: 'warning',
    duration: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast that does not auto-dismiss and requires manual closing.',
      },
    },
  },
};

export const Interactive: StoryObj<typeof Toast> = {
  render: () => {
    const [toasts, setToasts] = React.useState<ToastItem[]>([]);
    
    const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
      const id = Date.now();
      const newToast: ToastItem = { id, message, type, duration: 3000 };
      setToasts(prev => [...prev, newToast]);
    };
    
    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    
    const ToastComponent = ({ toast }: { toast: ToastItem }) => (
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={() => removeToast(toast.id)}
      />
    );
    
    return (
      <div className="space-y-4 p-8 min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Interactive Toast Demo</h2>
          <div className="space-y-2">
            <button
              className="btn-primary w-full"
              onClick={() => showToast('This is an info message!', 'info')}
            >
              Show Info Toast
            </button>
            <button
              className="btn-primary w-full"
              onClick={() => showToast('Success! Action completed.', 'success')}
            >
              Show Success Toast
            </button>
            <button
              className="btn-primary w-full"
              onClick={() => showToast('Warning: Check your input.', 'warning')}
            >
              Show Warning Toast
            </button>
            <button
              className="btn-primary w-full"
              onClick={() => showToast('Error: Something went wrong.', 'error')}
            >
              Show Error Toast
            </button>
            <button
              className="btn-secondary w-full"
              onClick={() => setToasts([])}
            >
              Clear All Toasts
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Active toasts: {toasts.length}
          </div>
        </div>
        
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map(toast => (
            <ToastComponent key={toast.id} toast={toast} />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing multiple toasts and manual control.',
      },
    },
  },
};
