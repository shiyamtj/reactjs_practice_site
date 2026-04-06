import React, { createContext, useContext, useState, useEffect } from 'react';

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
  preferredContact: string[];
  timestamp: number;
}

interface ContactContextType {
  contacts: Contact[];
  isLoading: boolean;
  addContact: (newContact: Omit<Contact, 'id' | 'timestamp'>) => void;
  deleteContact: (id: string) => Promise<void>;
  deleteMultipleContacts: (ids: string[]) => Promise<void>;
  deleteAllContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

interface ContactProviderProps {
  children: React.ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial contacts from JSON file
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      // Set empty array on error to prevent app from breaking
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addContact = (newContact: Omit<Contact, 'id' | 'timestamp'>): void => {
    const contactWithId: Contact = {
      ...newContact,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setContacts(prev => [contactWithId, ...prev]);
  };

  const deleteContact = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const deleteMultipleContacts = async (ids: string[]): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contacts');
      }
      
      setContacts(prev => prev.filter(contact => !ids.includes(contact.id)));
    } catch (error) {
      console.error('Error deleting contacts:', error);
      throw error;
    }
  };

  const deleteAllContacts = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts/all', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete all contacts');
      }
      
      setContacts([]);
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      throw error;
    }
  };

  const value: ContactContextType = {
    contacts,
    isLoading,
    addContact,
    deleteContact,
    deleteMultipleContacts,
    deleteAllContacts
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};
