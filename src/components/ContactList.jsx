import React, { useState } from 'react';
import { useContacts } from '../contexts/ContactContext';
import { useToast } from '../contexts/ToastContext';
import ConfirmModal from './ConfirmModal';

const ContactList = () => {
  const { contacts, isLoading, deleteMultipleContacts, deleteAllContacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'deleteSelected' });

  const showToast = (message, type = 'info') => {
    // This would use the toast context
    console.log(`${type}: ${message}`);
  };

  const toggleContactSelection = (contactId) => {
    const newSelection = new Set(selectedContacts);
    if (newSelection.has(contactId)) {
      newSelection.delete(contactId);
    } else {
      newSelection.add(contactId);
    }
    setSelectedContacts(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedContacts.size === contacts.length && contacts.length > 0) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(contacts.map(c => c.id)));
    }
  };

  const openModal = (type, title, message, confirmText, modalType = 'danger') => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
      confirmText,
      modalType
    });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: 'deleteSelected' });
  };

  const confirmDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      await deleteMultipleContacts(Array.from(selectedContacts));
      setSelectedContacts(new Set());
      showToast('Selected contacts deleted successfully', 'success');
      closeModal();
    } catch (error) {
      showToast('Failed to delete selected contacts', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteAll = async () => {
    setIsDeleting(true);
    try {
      await deleteAllContacts();
      setSelectedContacts(new Set());
      showToast('All contacts deleted successfully', 'success');
      closeModal();
    } catch (error) {
      showToast('Failed to delete all contacts', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteSelectedContacts = () => {
    openModal(
      'deleteSelected',
      'Delete Selected Contacts',
      `Are you sure you want to delete ${selectedContacts.size} selected contact(s)? This action cannot be undone.`,
      'Delete Selected'
    );
  };

  const handleDeleteAllContacts = () => {
    openModal(
      'deleteAll',
      'Delete All Contacts',
      `Are you sure you want to delete all ${contacts.length} contacts? This action cannot be undone.`,
      'Delete All'
    );
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-700 bg-red-100/80 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100/80 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-100/80 border-green-200';
      default: return 'text-gray-700 dark:text-slate-300 bg-gray-100/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="card p-8 text-center">
          <svg className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 dark:text-slate-300">Loading contacts...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">{contacts.length}</p>
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
                {contacts.filter(c => c.urgency === 'high').length}
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
              {selectedContacts.size === contacts.length && contacts.length > 0 ? (
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
              onClick={deleteSelectedContacts}
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
              onClick={handleDeleteAllContacts}
              disabled={contacts.length === 0 || isDeleting}
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
      {contacts.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-2">No contacts found</h3>
          <p className="text-slate-600 dark:text-slate-300">Contact submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.type === 'deleteSelected' ? confirmDeleteSelected : confirmDeleteAll}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        type={modalConfig.modalType}
      />
    </div>
  );
};

export default ContactList;
