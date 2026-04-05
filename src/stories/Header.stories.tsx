import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Welcome to Our Site',
    subtitle: 'Building amazing experiences',
  },
};

export const Minimal: Story = {
  args: {
    title: 'Home',
    subtitle: '',
  },
};
