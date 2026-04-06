import { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '../components/ConfirmModal';
import React from 'react';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component for confirming destructive or important actions with customizable types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    message: {
      control: 'text',
      description: 'Modal message content',
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
    },
    type: {
      control: 'select',
      options: ['danger', 'warning'],
      description: 'Type of modal (affects styling)',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Callback when modal is confirmed',
    },
  },
};

export default meta;

export const DangerType: StoryObj<typeof ConfirmModal> = {
  args: {
    isOpen: true,
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger type modal for destructive actions like deletion.',
      },
    },
  },
};

export const WarningType: StoryObj<typeof ConfirmModal> = {
  args: {
    isOpen: true,
    title: 'Important Warning',
    message: 'This action may have unintended consequences. Please review carefully before proceeding.',
    confirmText: 'Continue',
    cancelText: 'Go Back',
    type: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning type modal for important but non-destructive actions.',
      },
    },
  },
};

export const CustomText: StoryObj<typeof ConfirmModal> = {
  args: {
    isOpen: true,
    title: 'Custom Action',
    message: 'Do you want to proceed with this custom action?',
    confirmText: 'Yes, Proceed',
    cancelText: 'No, Cancel',
    type: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with custom button text.',
      },
    },
  },
};

export const LongMessage: StoryObj<typeof ConfirmModal> = {
  args: {
    isOpen: true,
    title: 'Complex Action Required',
    message: 'This is a longer message that provides detailed context about the action being performed. It may include multiple sentences and important information that the user needs to understand before making a decision. The modal should handle this content gracefully.',
    confirmText: 'I Understand',
    cancelText: 'Cancel',
    type: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with a long message to test content handling.',
      },
    },
  },
};

export const Interactive: StoryObj<typeof ConfirmModal> = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div>
        <button
          className="btn-primary"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Confirmed!');
            setIsOpen(false);
          }}
          title="Interactive Demo"
          message="This is an interactive modal. Click the buttons to see the callbacks in action."
          confirmText="Confirm"
          cancelText="Cancel"
          type="danger"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive modal that can be opened and closed.',
      },
    },
  },
};
