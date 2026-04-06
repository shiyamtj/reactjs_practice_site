import { Meta, StoryObj } from '@storybook/react';
import Menu from '../components/Menu';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Responsive navigation menu with desktop and mobile views, supporting submenus and hover interactions.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with optional submenus',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

export const Simple: StoryObj<typeof Menu> = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple menu with basic navigation items.',
      },
    },
  },
};

export const WithSubmenus: StoryObj<typeof Menu> = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        submenu: [
          { label: 'Web Apps', href: '/products/web-apps' },
          { label: 'Mobile Apps', href: '/products/mobile-apps' },
          { label: 'Desktop Software', href: '/products/desktop' },
        ],
      },
      {
        label: 'Services',
        submenu: [
          { label: 'Consulting', href: '/services/consulting' },
          { label: 'Development', href: '/services/development' },
          { label: 'Support', href: '/services/support' },
        ],
      },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with dropdown submenus that appear on hover.',
      },
    },
  },
};

export const LongMenu: StoryObj<typeof Menu> = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Resources', href: '/resources' },
      { label: 'Company', href: '/company' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with many items to test responsive behavior.',
      },
    },
  },
};

export const ComplexStructure: StoryObj<typeof Menu> = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      {
        label: 'Analytics',
        submenu: [
          { label: 'Overview', href: '/analytics/overview' },
          { label: 'Reports', href: '/analytics/reports' },
          { label: 'Insights', href: '/analytics/insights' },
          { label: 'Metrics', href: '/analytics/metrics' },
        ],
      },
      {
        label: 'Management',
        submenu: [
          { label: 'Users', href: '/management/users' },
          { label: 'Teams', href: '/management/teams' },
          { label: 'Projects', href: '/management/projects' },
          { label: 'Resources', href: '/management/resources' },
        ],
      },
      {
        label: 'Settings',
        submenu: [
          { label: 'Profile', href: '/settings/profile' },
          { label: 'Security', href: '/settings/security' },
          { label: 'Preferences', href: '/settings/preferences' },
          { label: 'Integrations', href: '/settings/integrations' },
        ],
      },
      { label: 'Help', href: '/help' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex menu structure with multiple submenus.',
      },
    },
  },
};

export const Empty: StoryObj<typeof Menu> = {
  args: {
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty menu state.',
      },
    },
  },
};

export const MobileView: StoryObj<typeof Menu> = {
  render: () => {
    const items: MenuItem[] = [
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        submenu: [
          { label: 'Web Apps', href: '/products/web-apps' },
          { label: 'Mobile Apps', href: '/products/mobile-apps' },
        ],
      },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ];

    return (
      <MemoryRouter>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl">
          <div className="lg:hidden">
            <Menu items={items} />
            <p className="text-white text-sm mt-4 opacity-75">
              Mobile view - Click the hamburger menu to see the mobile navigation
            </p>
          </div>
        </div>
      </MemoryRouter>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with hamburger menu and slide-out navigation.',
      },
    },
  },
};
