import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial contacts from JSON file
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
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

  const addContact = (newContact) => {
    const contactWithId = {
      ...newContact,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setContacts(prev => [contactWithId, ...prev]);
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to delete contact';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, use a user-friendly message
          errorMessage = 'Something went wrong! Server unavailable!';
        }
        throw new Error(errorMessage);
      }
      
      setContacts(prev => prev.filter(contact => contact.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const deleteMultipleContacts = async (ids) => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: Array.from(ids) }),
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to delete contacts';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, use a user-friendly message
          errorMessage = 'Something went wrong! Server unavailable!';
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      setContacts(prev => prev.filter(contact => !ids.has(contact.id)));
      return result;
    } catch (error) {
      console.error('Error deleting contacts:', error);
      throw error;
    }
  };

  const deleteAllContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts/all', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to delete all contacts';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, use a user-friendly message
          errorMessage = 'Something went wrong! Server unavailable!';
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      setContacts([]);
      return result;
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      throw error;
    }
  };

  const value = {
    contacts,
    isLoading,
    addContact,
    deleteContact,
    deleteMultipleContacts,
    deleteAllContacts,
    refreshContacts: loadContacts
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
