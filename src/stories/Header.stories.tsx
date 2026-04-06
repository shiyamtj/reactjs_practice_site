import { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern, responsive header component with gradient background, branding, and navigation menu. Features include mobile responsiveness, submenu support, and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title displayed in the header',
      defaultValue: 'Welcome',
    },
    subtitle: {
      control: 'text', 
      description: 'Subtitle displayed below the title',
      defaultValue: 'Simple Home Page',
    },
    menuItems: {
      control: 'object',
      description: 'Array of menu items for navigation. Items can have nested submenus.',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Header> = {
  args: {
    title: 'Welcome',
    subtitle: 'Simple Home Page',
    menuItems: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'The default header with basic title and subtitle. This is the minimal configuration showing the branding area with no navigation menu.',
      },
    },
  },
};

export const WithNavigation: StoryObj<typeof Header> = {
  args: {
    title: 'Tech Company',
    subtitle: 'Innovation & Excellence',
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with a complete navigation menu. The menu items are rendered as links and support hover states and active states.',
      },
    },
  },
};

export const WithSubmenus: StoryObj<typeof Header> = {
  args: {
    title: 'Enterprise Platform',
    subtitle: 'Complete Business Solutions',
    menuItems: [
      { 
        label: 'Products', 
        href: '/products',
        submenu: [
          { label: 'Software', href: '/products/software' },
          { label: 'Hardware', href: '/products/hardware' },
          { label: 'Services', href: '/products/services' },
        ]
      },
      { 
        label: 'Solutions', 
        href: '/solutions',
        submenu: [
          { label: 'Small Business', href: '/solutions/small-business' },
          { label: 'Enterprise', href: '/solutions/enterprise' },
          { label: 'Non-profit', href: '/solutions/non-profit' },
        ]
      },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Support', href: '/support' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header featuring dropdown submenus. Hover over menu items to reveal nested navigation options. The submenus support multiple levels of nesting.',
      },
    },
  },
};

export const Minimal: StoryObj<typeof Header> = {
  args: {
    title: 'App',
    subtitle: '',
    menuItems: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'A minimal header configuration with just the app title and no subtitle or navigation. Perfect for simple applications or landing pages.',
      },
    },
  },
};

export const LongTitle: StoryObj<typeof Header> = {
  args: {
    title: 'Digital Transformation Solutions Provider',
    subtitle: 'Empowering Businesses with Cutting-Edge Technology and Innovation',
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with long title and subtitle text to test text wrapping and responsive behavior.',
      },
    },
  },
};

export const ManyMenuItems: StoryObj<typeof Header> = {
  args: {
    title: 'Corporate Site',
    subtitle: 'Global Business Solutions',
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Partners', href: '/partners' },
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with many menu items to test responsive behavior and overflow handling on smaller screens.',
      },
    },
  },
};

export const InteractiveDemo: StoryObj<typeof Header> = {
  args: {
    title: 'Interactive Demo', 
    subtitle: 'Experience the header in a realistic context',
    menuItems: [
      { 
        label: 'Features', 
        href: '/features',
        submenu: [
          { label: 'Analytics', href: '/features/analytics' },
          { label: 'Reporting', href: '/features/reporting' },
          { label: 'Dashboard', href: '/features/dashboard' },
        ]
      },
      { 
        label: 'Products', 
        href: '/products',
        submenu: [
          { label: 'Basic Plan', href: '/products/basic' },
          { label: 'Pro Plan', href: '/products/pro' },
          { label: 'Enterprise', href: '/products/enterprise' },
        ]
      },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete interactive demo showing the header with complex menu structure.',
      },
    },
  },
};

export const Playground: StoryObj<typeof Header> = {
  args: {
    title: 'Custom Title',
    subtitle: 'Custom Subtitle',
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story as a playground to test different combinations of props. Modify the controls to see how the header responds.',
      },
    },
  },
};
