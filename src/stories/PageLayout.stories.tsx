import { Meta, StoryObj } from '@storybook/react';
import PageLayout from '../components/PageLayout';
import React from 'react';

type MaxWidth = 'max-w-2xl' | 'max-w-4xl' | 'max-w-6xl' | 'max-w-7xl' | 'max-w-full';

const meta: Meta<typeof PageLayout> = {
  title: 'Components/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Flexible page layout component with optional header, title, and description for consistent page structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title displayed in the header',
    },
    description: {
      control: 'text',
      description: 'Optional description displayed below the title',
    },
    maxWidth: {
      control: 'select',
      options: ['max-w-2xl', 'max-w-4xl', 'max-w-6xl', 'max-w-7xl', 'max-w-full'],
      description: 'Maximum width of the content area',
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the header section with title and description',
    },
    children: {
      control: 'text',
      description: 'Content to be rendered within the layout',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Welcome to Our Site',
    description: 'This is a sample page layout with title and description.',
    children: (
      <div className="space-y-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Content Section</h3>
          <p className="text-gray-600">This is sample content within the PageLayout component. The layout provides consistent spacing and structure across different pages.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h4 className="text-lg font-semibold mb-3">Feature 1</h4>
            <p className="text-gray-600">Description of the first feature.</p>
          </div>
          <div className="card p-6">
            <h4 className="text-lg font-semibold mb-3">Feature 2</h4>
            <p className="text-gray-600">Description of the second feature.</p>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default page layout with title, description, and sample content.',
      },
    },
  },
};

export const WithoutHeader: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Hidden Header',
    showHeader: false,
    children: (
      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Custom Header Content</h2>
          <p className="text-gray-600">This layout has the default header hidden, allowing for custom header implementation.</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout without the default header section.',
      },
    },
  },
};

export const Narrow: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Narrow Layout',
    description: 'This layout uses a narrower maximum width for focused content.',
    maxWidth: 'max-w-2xl',
    children: (
      <div className="prose prose-lg max-w-none">
        <p>This is an example of a narrow layout that works well for articles, blog posts, or documentation where you want to limit the line length for better readability.</p>
        <p>The content is constrained to a maximum width that provides optimal reading experience on larger screens.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with narrow content width for focused reading.',
      },
    },
  },
};

export const Wide: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Wide Layout',
    description: 'This layout uses the full width available for dashboards and data-heavy pages.',
    maxWidth: 'max-w-full',
    children: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Main Content Area</h3>
            <p className="text-gray-600 mb-4">This wide layout is perfect for dashboards, analytics pages, or content that needs more horizontal space.</p>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Chart or Data Visualization</span>
            </div>
          </div>
        </div>
        <div>
          <div className="card p-6">
            <h4 className="text-lg font-semibold mb-3">Sidebar</h4>
            <p className="text-gray-600">Additional information or controls.</p>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with full-width content for dashboards.',
      },
    },
  },
};

export const Simple: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Simple Page',
    children: (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Success!</h3>
        <p className="text-gray-600">This is a simple page with minimal content.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple page layout with minimal content.',
      },
    },
  },
};

export const WithComplexContent: StoryObj<typeof PageLayout> = {
  args: {
    title: 'Complex Content Layout',
    description: 'This example shows how the PageLayout handles complex nested content.',
    children: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Fast</h4>
            <p className="text-sm text-gray-600">Lightning quick performance</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Reliable</h4>
            <p className="text-sm text-gray-600">Built with stability in mind</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Flexible</h4>
            <p className="text-sm text-gray-600">Adapts to your needs</p>
          </div>
        </div>
        
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-4">Detailed Information</h3>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">The PageLayout component provides a consistent structure for all pages in your application. It handles spacing, typography, and responsive behavior automatically.</p>
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
              <code className="text-sm">
                {`<PageLayout title="Page Title" description="Optional description">
  {/* Your content goes here */}
</PageLayout>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with complex nested content and components.',
      },
    },
  },
};
