import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';
import { useContacts } from '../contexts/ContactContext';

const MultiStepContactForm = () => {
  const { addContact } = useContacts();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2: Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Step 3: Message Details
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const totalSteps = 4;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.street && formData.city && formData.state && formData.zipCode;
      case 3:
        return formData.subject && formData.message;
      default:
        return true;
    }
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3001/api/contact', formData);
      if (response.data.success) {
        // Add contact to global state immediately
        addContact(formData);
        
        showToast('Contact form submitted successfully!', 'success');
        
        // Reset form after toast is visible
        setTimeout(() => {
          setFormData({
            firstName: '', lastName: '', email: '', phone: '',
            street: '', city: '', state: '', zipCode: '', country: '',
            subject: '', message: '', preferredContact: 'email', urgency: 'normal'
          });
          setCurrentStep(1);
        }, 500);
      }
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Personal Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Let's get to know you better</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">First Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Last Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Email *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Address Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Where can we reach you?</p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Street Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">City *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                      placeholder="New York"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">State *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">ZIP Code *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Country</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Message Details
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Tell us what's on your mind</p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Subject *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Message *</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80 resize-none"
                    placeholder="Share your thoughts, questions, or feedback..."
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Preferred Contact Method</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80 appearance-none cursor-pointer"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Urgency</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80 appearance-none cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Review & Confirm
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Please verify your information before submitting</p>
            </div>
            <div className="card p-6 space-y-6">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-50 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Information Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Email:</span> {formData.email}</p>
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Phone:</span> {formData.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-900 dark:text-slate-50">{formData.street}</p>
                    <p className="text-slate-900 dark:text-slate-50">{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p className="text-slate-900 dark:text-slate-50">{formData.country || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Message Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Subject:</span> {formData.subject}</p>
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Contact:</span> {formData.preferredContact}</p>
                    <p className="text-slate-900 dark:text-slate-50"><span className="font-semibold">Urgency:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        formData.urgency === 'urgent' ? 'bg-red-500/20 text-red-700 dark:text-red-300' :
                        formData.urgency === 'high' ? 'bg-orange-500/20 text-orange-700 dark:text-orange-300' :
                        formData.urgency === 'low' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' :
                        'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300'
                      }`}>
                        {formData.urgency}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Message
                  </h4>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 max-h-32 overflow-y-auto border border-gray-200 dark:border-slate-600">
                    <p className="text-sm text-slate-900 dark:text-slate-50 leading-relaxed">{formData.message}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">Confirmation Required</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    By clicking submit, you confirm that all information provided is accurate and you consent to being contacted through your preferred method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card p-8">
      {/* Progress Bar */}
      <div className="mb-10">
        {/* Linear Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            >
              <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Panel Progress Indicators */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[...Array(totalSteps)].map((_, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;
            
            return (
              <div
                key={index}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  isCompleted 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300 shadow-lg transform scale-105' 
                    : isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-lg transform scale-105 ring-2 ring-indigo-500/30' 
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {isCompleted ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : isActive ? (
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{stepNumber}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 dark:text-slate-400 font-bold">{stepNumber}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-semibold">
                    {stepNumber === 1 && 'Personal'}
                    {stepNumber === 2 && 'Address'}
                    {stepNumber === 3 && 'Message'}
                    {stepNumber === 4 && 'Confirm'}
                  </div>
                </div>
                
                {/* Connecting lines */}
                {index < totalSteps - 1 && (
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <div className={`w-4 h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'
                    }`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Step */}
      <form onSubmit={(e) => e.preventDefault()}>
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`btn-secondary px-8 py-4 rounded-xl font-semibold ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </span>
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              className={`btn-primary px-8 py-4 rounded-xl font-semibold ${
                !validateCurrentStep() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center">
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`btn-primary px-8 py-4 rounded-xl font-semibold ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepContactForm;
