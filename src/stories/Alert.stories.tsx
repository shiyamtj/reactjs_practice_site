import { Meta, StoryObj } from '@storybook/react';
import Alert from '../components/Alert';
import React from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alert component for displaying important messages with different types and dismissibility options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of alert to display',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    message: {
      control: 'text',
      description: 'Main message content of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

export const Info: StoryObj<typeof Alert> = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'This is an informational message to help guide the user.',
  },
};

export const Success: StoryObj<typeof Alert> = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully.',
  },
};

export const Warning: StoryObj<typeof Alert> = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Please review this information before proceeding.',
  },
};

export const Error: StoryObj<typeof Alert> = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
};

export const Dismissible: StoryObj<typeof Alert> = {
  args: {
    type: 'info',
    title: 'Dismissible Alert',
    message: 'This alert can be dismissed by clicking the X button.',
    dismissible: true,
  },
};

export const WithoutTitle: StoryObj<typeof Alert> = {
  args: {
    type: 'success',
    message: 'Simple message without a title.',
  },
};

export const WithChildren: StoryObj<typeof Alert> = {
  args: {
    type: 'info',
    title: 'Alert with Custom Content',
    message: 'This alert has custom children content.',
    children: (
      <div className="mt-2">
        <button className="btn-primary mr-2">Action 1</button>
        <button className="btn-secondary">Action 2</button>
      </div>
    ),
  },
};

export const CustomStyled: StoryObj<typeof Alert> = {
  args: {
    type: 'warning',
    title: 'Custom Styled Alert',
    message: 'This alert has additional custom styling.',
    className: 'border-2 border-dashed',
  },
};
