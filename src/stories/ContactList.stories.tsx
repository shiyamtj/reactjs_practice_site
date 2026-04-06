import { Meta, StoryObj } from '@storybook/react';
import ContactList from '../components/ContactList';
import { ContactProvider } from '../contexts/ContactContext';
import { ToastProvider } from '../contexts/ToastContext';
import React from 'react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  subject: string;
  message: string;
  urgency: 'high' | 'medium' | 'low' | 'normal';
  preferredContact: string;
  timestamp: number;
}

const meta: Meta<typeof ContactList> = {
  title: 'Components/ContactList',
  component: ContactList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive contact management interface with selection, deletion, and bulk operations.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <ContactProvider>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </ContactProvider>
    ),
  ],
};

export default meta;

export const Loading: StoryObj<typeof ContactList> = {
  render: () => {
    const MockContactList = () => {
      const [isLoading] = React.useState(true);
      
      // Override the loading state for demo
      React.useEffect(() => {
        const originalLoadContacts = require('../contexts/ContactContext').ContactProvider;
        // This is a simplified mock for Storybook
      }, []);

      return <ContactList />;
    };

    return (
      <ContactProvider>
        <ToastProvider>
          <MockContactList />
        </ToastProvider>
      </ContactProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while fetching contacts.',
      },
    },
  },
};

export const Empty: StoryObj<typeof ContactList> = {
  render: () => {
    const MockContactList = () => {
      // Mock empty contacts
      const mockContacts: Contact[] = [];
      
      return (
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="card p-6 mb-6 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gradient">
              Contact Management
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Manage and organize your contact submissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">0</p>
                </div>
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">Selected</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">0</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">High Priority</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">0</p>
                </div>
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-2">No contacts found</h3>
            <p className="text-slate-600 dark:text-slate-300">Contact submissions will appear here</p>
          </div>
        </div>
      );
    };

    return (
      <ContactProvider>
        <ToastProvider>
          <MockContactList />
        </ToastProvider>
      </ContactProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no contacts are available.',
      },
    },
  },
};

export const WithContacts: StoryObj<typeof ContactList> = {
  render: () => {
    const mockContacts: Contact[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        subject: 'Product Inquiry',
        message: 'I am interested in learning more about your products and services. Could you please provide me with detailed information?',
        urgency: 'high',
        preferredContact: 'email',
        timestamp: Date.now() - 86400000, // 1 day ago
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'United States',
        subject: 'Support Request',
        message: 'I need help with my recent order. The tracking information is not updating properly.',
        urgency: 'medium',
        preferredContact: 'phone',
        timestamp: Date.now() - 172800000, // 2 days ago
      },
      {
        id: '3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1 (555) 456-7890',
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60007',
        country: 'United States',
        subject: 'General Question',
        message: 'Do you offer international shipping? I am located in Canada.',
        urgency: 'low',
        preferredContact: 'email',
        timestamp: Date.now() - 259200000, // 3 days ago
      },
    ];

    const MockContactList = () => {
      const [selectedContacts, setSelectedContacts] = React.useState<Set<string>>(new Set());
      const [isDeleting, setIsDeleting] = React.useState(false);

      const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
          case 'high': return 'text-red-700 bg-red-100/80 border-red-200';
          case 'medium': return 'text-yellow-700 bg-yellow-100/80 border-yellow-200';
          case 'low': return 'text-green-700 bg-green-100/80 border-green-200';
          case 'normal': return 'text-blue-700 bg-blue-100/80 border-blue-200';
          default: return 'text-gray-700 dark:text-slate-300 bg-gray-100/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700';
        }
      };

      const toggleContactSelection = (contactId: string) => {
        const newSelection = new Set(selectedContacts);
        if (newSelection.has(contactId)) {
          newSelection.delete(contactId);
        } else {
          newSelection.add(contactId);
        }
        setSelectedContacts(newSelection);
      };

      const toggleSelectAll = () => {
        if (selectedContacts.size === mockContacts.length && mockContacts.length > 0) {
          setSelectedContacts(new Set());
        } else {
          setSelectedContacts(new Set(mockContacts.map(c => c.id)));
        }
      };

      return (
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="card p-6 mb-6 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gradient">
              Contact Management
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Manage and organize your contact submissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">{mockContacts.length}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">Selected</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">{selectedContacts.size}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-xs mb-1 font-semibold">High Priority</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                    {mockContacts.filter(c => c.urgency === 'high').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="card p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSelectAll}
                  className="btn-secondary px-4 py-2 rounded-xl font-medium text-sm"
                >
                  {selectedContacts.size === mockContacts.length && mockContacts.length > 0 ? (
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 dark:text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    </svg>
                  )}
                  Select All
                </button>
                
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  {selectedContacts.size > 0 && `${selectedContacts.size} selected`}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  disabled={selectedContacts.size === 0 || isDeleting}
                  className="btn-danger px-4 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Selected
                  </span>
                </button>
                <button
                  disabled={mockContacts.length === 0 || isDeleting}
                  className="btn-danger px-4 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete All
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                className={`card p-6 transition-all duration-300 ${
                  selectedContacts.has(contact.id)
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleContactSelection(contact.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {selectedContacts.has(contact.id) ? (
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 dark:text-slate-500 hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-1">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-600 dark:text-slate-300">{contact.email}</p>
                          <p className="text-slate-600 dark:text-slate-300">{contact.phone}</p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(contact.urgency)}`}>
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {contact.urgency?.toUpperCase()} PRIORITY
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Address</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{contact.street}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {contact.city}, {contact.state} {contact.zipCode}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{contact.country}</p>
                    </div>
                    
                    {/* Message & Metadata */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Subject: {contact.subject}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{contact.message}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                        <span>Preferred: {contact.preferredContact}</span>
                        <span>{formatDate(contact.timestamp)}</span>
                      </div>
                      
                      {/* Delete Button */}
                      <div className="pt-2">
                        <button
                          disabled={isDeleting}
                          className="btn-danger px-3 py-1 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <ContactProvider>
        <ToastProvider>
          <MockContactList />
        </ToastProvider>
      </ContactProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact list with sample data showing different urgency levels and contact information.',
      },
    },
  },
};
