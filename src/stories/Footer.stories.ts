import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    copyright: "2026",
    company: "Shiyam Jannan"
  },
};

export const CustomCompany: Story = {
  args: {
    copyright: '2024',
    company: 'Tech Solutions Inc.',
  },
};

export const DifferentYear: Story = {
  args: {
    copyright: '2023',
    company: 'Web Development Co.',
  },
};
