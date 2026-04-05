import type { Meta, StoryObj } from '@storybook/react';
import Menu from '../components/Menu';
import { any } from 'prop-types';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with optional submenus'
    }
  }
};

export default meta;

type Story = StoryObj<typeof any>;

const sampleItems = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: '🏠'
  },
  {
    id: 'products',
    label: 'Products',
    icon: '📦',
    submenu: [
      {
        id: 'electronics',
        label: 'Electronics',
        href: '#electronics',
        submenu: [
          {
            id: 'phones',
            label: 'Smartphones',
            href: '#phones'
          },
          {
            id: 'laptops',
            label: 'Laptops',
            href: '#laptops'
          }
        ]
      },
      {
        id: 'clothing',
        label: 'Clothing',
        href: '#clothing'
      }
    ]
  },
  {
    id: 'about',
    label: 'About',
    href: '#about',
    icon: 'ℹ️'
  }
];

export const Default: Story = {
  args: {
    items: sampleItems
  }
};

export const WithoutIcons: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '#home'
      },
      {
        id: 'products',
        label: 'Products',
        submenu: [
          {
            id: 'electronics',
            label: 'Electronics',
            href: '#electronics'
          },
          {
            id: 'clothing',
            label: 'Clothing',
            href: '#clothing'
          }
        ]
      },
      {
        id: 'about',
        label: 'About',
        href: '#about'
      }
    ]
  }
};

export const DeepNesting: Story = {
  args: {
    items: [
      {
        id: 'level1',
        label: 'Level 1',
        submenu: [
          {
            id: 'level2',
            label: 'Level 2',
            submenu: [
              {
                id: 'level3',
                label: 'Level 3',
                submenu: [
                  {
                    id: 'level4',
                    label: 'Level 4',
                    href: '#level4'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export const Empty: Story = {
  args: {
    items: []
  }
};
