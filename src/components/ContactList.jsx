import React, { useState } from 'react';
import { useContacts } from '../contexts/ContactContext';
import { useToast } from '../contexts/ToastContext';
import ConfirmModal from './ConfirmModal';

const ContactList = () => {
  const { contacts, isLoading, deleteMultipleContacts, deleteAllContacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'deleteSelected' });
  const { showToast } = useToast();


  const toggleContactSelection = (id) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedContacts.size === contacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(contacts.map(contact => contact.id)));
    }
  };

  const deleteSelectedContacts = async () => {
    if (selectedContacts.size === 0) {
      showToast('Please select at least one contact to delete.', 'warning');
      return;
    }
    
    setModalConfig({
      isOpen: true,
      type: 'deleteSelected',
      title: 'Delete Selected Contacts',
      message: `Are you sure you want to delete ${selectedContacts.size} selected contact(s)? This action cannot be undone.`,
      confirmText: 'Delete Selected',
      modalType: 'danger'
    });
  };

  const confirmDeleteSelected = async () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    setIsDeleting(true);
    try {
      const result = await deleteMultipleContacts(selectedContacts);
      setSelectedContacts(new Set());
      showToast(result.message || `Successfully deleted ${selectedContacts.size} contact(s).`, 'success');
      
    } catch (error) {
      console.error('Error deleting contacts:', error);
      showToast(error.message || 'Failed to delete contacts. Please try again.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAllContacts = async () => {
    if (contacts.length === 0) {
      showToast('No contacts to delete.', 'warning');
      return;
    }
    
    setModalConfig({
      isOpen: true,
      type: 'deleteAll',
      title: 'Delete All Contacts',
      message: `Are you sure you want to delete all ${contacts.length} contacts? This action cannot be undone.`,
      confirmText: 'Delete All',
      modalType: 'danger'
    });
  };

  const confirmDeleteAll = async () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    setIsDeleting(true);
    try {
      const result = await deleteAllContacts();
      setSelectedContacts(new Set());
      showToast(result.message || `Successfully deleted all contacts.`, 'success');
      
    } catch (error) {
      console.error('Error deleting all contacts:', error);
      showToast(error.message || 'Failed to delete all contacts. Please try again.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
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
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800/30';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-purple-300">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Contact Management
          </h1>
          <p className="text-gray-300 text-lg">
            Manage and organize your contact submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">Total Contacts</p>
                <p className="text-3xl font-bold text-white">{contacts.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">Selected</p>
                <p className="text-3xl font-bold text-white">{selectedContacts.size}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">High Priority</p>
                <p className="text-3xl font-bold text-white">
                  {contacts.filter(c => c.urgency === 'high').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 text-white"
              >
                {selectedContacts.size === contacts.length && contacts.length > 0 ? (
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                )}
                <span>Select All</span>
              </button>
              
              <span className="text-gray-300">
                {selectedContacts.size > 0 && `${selectedContacts.size} selected`}
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={deleteSelectedContacts}
                disabled={selectedContacts.size === 0 || isDeleting}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 text-white font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected
              </button>
              
              <button
                onClick={handleDeleteAllContacts}
                disabled={contacts.length === 0 || isDeleting}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 text-white font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete All
              </button>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No contacts found</h3>
            <p className="text-gray-400">Contact submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-200 hover:shadow-xl ${
                  selectedContacts.has(contact.id)
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/20 hover:border-purple-300/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleContactSelection(contact.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {selectedContacts.has(contact.id) ? (
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-300">{contact.email}</p>
                          <p className="text-gray-300">{contact.phone}</p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(contact.urgency)}`}>
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {contact.urgency?.toUpperCase()} PRIORITY
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-purple-300">Address</p>
                      <p className="text-sm text-gray-300">{contact.street}</p>
                      <p className="text-sm text-gray-300">
                        {contact.city}, {contact.state} {contact.zipCode}
                      </p>
                      <p className="text-sm text-gray-300">{contact.country}</p>
                    </div>
                    
                    {/* Message & Metadata */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-purple-300 mb-1">Subject: {contact.subject}</p>
                        <p className="text-sm text-gray-300 line-clamp-3">{contact.message}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
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
      </div>
      
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
