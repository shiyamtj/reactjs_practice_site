import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';
import { useContacts } from '../contexts/ContactContext';
import Alert from './Alert';
import addresses from '../data/addresses.json';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  income: string;
  maritalStatus: string;
  hasKids: boolean;
  numberOfKids: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  subject: string;
  message: string;
  preferredContact: string[];
  urgency: 'high' | 'medium' | 'low' | 'normal';
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  income?: string;
  maritalStatus?: string;
  hasKids?: string;
  numberOfKids?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  subject?: string;
  message?: string;
  preferredContact?: string;
  urgency?: string;
}

const MultiStepContactForm: React.FC = () => {
  const { addContact } = useContacts();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    income: '',
    maritalStatus: '',
    hasKids: false,
    numberOfKids: '',
    // Step 2: Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Step 3: Message Details
    subject: '',
    message: '',
    preferredContact: ['email'],
    urgency: 'normal'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showStepError, setShowStepError] = useState<boolean>(false);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState<boolean>(false);
  const [filteredAddresses, setFilteredAddresses] = useState<typeof addresses>([]);
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const [showContactDropdown, setShowContactDropdown] = useState<boolean>(false);
  const contactDropdownRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();

  const totalSteps = 4;

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'First name can only contain letters, spaces, hyphens and apostrophes';
        return undefined;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Last name can only contain letters, spaces, hyphens and apostrophes';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)\.]+$/.test(value)) return 'Please enter a valid phone number';
        if (value) {
          const digitCount = value.replace(/\D/g, '').length;
          if (digitCount < 9) return 'Phone number must have at least 9 digits';
          if (digitCount > 12) return 'Phone number must have at most 12 digits';
        }
        return undefined;
      case 'dob':
        if (!value) return 'Date of birth is required';
        const dobDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (dobDate > today) return 'Date of birth cannot be in the future';
        if (age < 18) return 'You must be at least 18 years old';
        if (age > 120) return 'Please enter a valid date of birth';
        return undefined;
      case 'gender':
        if (!value) return 'Gender is required';
        return undefined;
      case 'income':
        if (value && !/^\$?[\d,]+(\.\d{0,2})?$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid currency amount (e.g., 50000 or $50,000)';
        return undefined;
      case 'maritalStatus':
        if (!value) return 'Marital status is required';
        return undefined;
      case 'numberOfKids':
        if (value && !/^\d+$/.test(value)) return 'Please enter a valid number of children (integers only)';
        if (value && parseInt(value, 10) > 20) return 'Please enter a realistic number (max 20)';
        if (value && parseInt(value, 10) < 1) return 'Please enter at least 1 child';
        return undefined;
      case 'street':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 3) return 'Street address must be at least 3 characters';
        return undefined;
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'City must be at least 2 characters';
        if (/\d/.test(value)) return 'City cannot contain numbers';
        return undefined;
      case 'state':
        if (!value.trim()) return 'State is required';
        if (value.trim().length < 2) return 'State must be at least 2 characters';
        if (/\d/.test(value)) return 'State cannot contain numbers';
        return undefined;
      case 'zipCode':
        if (!value.trim()) return 'ZIP code is required';
        if (!/^\d{5}(-\d{4})?$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
        return undefined;
      case 'country':
        if (value && value.trim().length < 2) return 'Country must be at least 2 characters';
        if (value && /\d/.test(value)) return 'Country cannot contain numbers';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        if (value.trim().length > 100) return 'Subject must be less than 100 characters';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 2000) return 'Message must be less than 2000 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateStep = useCallback((step: number, data: FormData): FormErrors => {
    const stepErrors: FormErrors = {};
    switch (step) {
      case 1: {
        const firstNameError = validateField('firstName', data.firstName);
        if (firstNameError) stepErrors.firstName = firstNameError;
        const lastNameError = validateField('lastName', data.lastName);
        if (lastNameError) stepErrors.lastName = lastNameError;
        const emailError = validateField('email', data.email);
        if (emailError) stepErrors.email = emailError;
        if (data.phone) {
          const phoneError = validateField('phone', data.phone);
          if (phoneError) stepErrors.phone = phoneError;
        }
        const dobError = validateField('dob', data.dob);
        if (dobError) stepErrors.dob = dobError;
        const genderError = validateField('gender', data.gender);
        if (genderError) stepErrors.gender = genderError;
        if (data.income) {
          const incomeError = validateField('income', data.income);
          if (incomeError) stepErrors.income = incomeError;
        }
        const maritalStatusError = validateField('maritalStatus', data.maritalStatus);
        if (maritalStatusError) stepErrors.maritalStatus = maritalStatusError;
        if (data.maritalStatus === 'married' && data.hasKids) {
          const numberOfKidsError = validateField('numberOfKids', data.numberOfKids);
          if (numberOfKidsError) stepErrors.numberOfKids = numberOfKidsError;
        }
        break;
      }
      case 2: {
        const streetError = validateField('street', data.street);
        if (streetError) stepErrors.street = streetError;
        const cityError = validateField('city', data.city);
        if (cityError) stepErrors.city = cityError;
        const stateError = validateField('state', data.state);
        if (stateError) stepErrors.state = stateError;
        const zipCodeError = validateField('zipCode', data.zipCode);
        if (zipCodeError) stepErrors.zipCode = zipCodeError;
        if (data.country) {
          const countryError = validateField('country', data.country);
          if (countryError) stepErrors.country = countryError;
        }
        break;
      }
      case 3: {
        const subjectError = validateField('subject', data.subject);
        if (subjectError) stepErrors.subject = subjectError;
        const messageError = validateField('message', data.message);
        if (messageError) stepErrors.message = messageError;
        break;
      }
    }
    return stepErrors;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation for touched fields
    if (touched[name]) {
      const fieldError = validateField(name as keyof FormData, value);
      setErrors(prev => {
        const newErrors = { ...prev, [name]: fieldError };
        const hasErrors = Object.values(newErrors).some(e => e !== undefined);
        // Update showStepError based on whether errors exist
        setShowStepError(hasErrors);
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name as keyof FormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const nextStep = (): void => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);
    
    // Mark all fields in current step as touched
    const stepFields = getStepFields(currentStep);
    setTouched(prev => ({
      ...prev,
      ...Object.fromEntries(stepFields.map(f => [f, true]))
    }));
    
    if (Object.keys(stepErrors).length === 0) {
      setShowStepError(false);
      setCurrentStep(currentStep + 1);
    } else {
      setShowStepError(true);
    }
  };

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1: return ['firstName', 'lastName', 'email', 'phone', 'dob', 'gender', 'income', 'maritalStatus', 'hasKids', 'numberOfKids'];
      case 2: return ['street', 'city', 'state', 'zipCode', 'country'];
      case 3: return ['subject', 'message', 'preferredContact', 'urgency'];
      default: return [];
    }
  };

  const prevStep = (): void => {
    setShowStepError(false);
    setShowAddressSuggestions(false);
    setCurrentStep(currentStep - 1);
  };

  // Address autocomplete handlers
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, street: value }));

    if (value.trim().length >= 2) {
      const filtered = addresses.filter(addr =>
        addr.street.toLowerCase().includes(value.toLowerCase()) ||
        addr.city.toLowerCase().includes(value.toLowerCase()) ||
        addr.zipCode.includes(value)
      );
      setFilteredAddresses(filtered);
      setShowAddressSuggestions(filtered.length > 0);
    } else {
      setShowAddressSuggestions(false);
    }
  };

  const selectAddress = (address: typeof addresses[0]): void => {
    setFormData(prev => ({
      ...prev,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country
    }));
    setShowAddressSuggestions(false);
    // Mark fields as touched for validation
    setTouched(prev => ({
      ...prev,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      country: true
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target as Node)) {
        setShowAddressSuggestions(false);
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setShowContactDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInputClassName = (fieldName: keyof FormData, hasIcon: boolean = false): string => {
    const baseClasses = 'w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80';
    const paddingClasses = hasIcon ? 'pl-12 pr-4 py-4' : 'px-4 py-4';
    const errorClasses = errors[fieldName] && touched[fieldName] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
      : 'border-gray-300 dark:border-slate-600';
    return `${baseClasses} ${paddingClasses} ${errorClasses}`;
  };

  const ErrorMessage = ({ field }: { field: keyof FormData }) => {
    if (!errors[field] || !touched[field]) return null;
    return (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {errors[field]}
      </p>
    );
  };

  const StepErrorAlert = (): React.ReactElement | null => {
    if (!showStepError) return null;
    const errorEntries = Object.entries(errors).filter(([, msg]) => msg !== undefined);
    const errorCount = errorEntries.length;
    if (errorCount === 0) return null;

    return (
      <Alert
        type="error"
        title={`Please fix the following ${errorCount} error${errorCount > 1 ? 's' : ''} before continuing`}
        className="mb-6"
      >
        <ul className="mt-1 text-sm text-red-600 dark:text-red-400 list-disc list-inside">
          {errorEntries.map(([field, message]) => (
            <li key={field}>{message}</li>
          ))}
        </ul>
      </Alert>
    );
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        // Add contact to global state immediately
        addContact(formData);
        
        showToast('Contact form submitted successfully!', 'success');
        
        // Reset form after toast is visible
        setTimeout(() => {
          setFormData({
            firstName: '', lastName: '', email: '', phone: '',
            dob: '', gender: '', income: '', maritalStatus: '', hasKids: false, numberOfKids: '',
            street: '', city: '', state: '', zipCode: '', country: '',
            subject: '', message: '', preferredContact: ['email'], urgency: 'normal'
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

  const renderStep = (): React.ReactElement => {
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
            <StepErrorAlert />
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
                    onBlur={handleBlur}
                    className={getInputClassName('firstName', true)}
                    placeholder="John"
                  />
                </div>
                <ErrorMessage field="firstName" />
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
                    onBlur={handleBlur}
                    className={getInputClassName('lastName', true)}
                    placeholder="Doe"
                  />
                </div>
                <ErrorMessage field="lastName" />
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
                    onBlur={handleBlur}
                    className={getInputClassName('email', true)}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <ErrorMessage field="email" />
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
                    onBlur={handleBlur}
                    className={getInputClassName('phone', true)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <ErrorMessage field="phone" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Date of Birth *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.preventDefault()}
                    className={getInputClassName('dob', true)}
                  />
                </div>
                <ErrorMessage field="dob" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClassName('gender')}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
                <ErrorMessage field="gender" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Annual Income</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('income', true)}
                    placeholder="$50,000"
                  />
                </div>
                <ErrorMessage field="income" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Marital Status *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClassName('maritalStatus')}
                >
                  <option value="">Select marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
                <ErrorMessage field="maritalStatus" />
              </div>
              {formData.maritalStatus === 'married' && (
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Do you have children?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasKids"
                        checked={formData.hasKids === true}
                        onChange={() => setFormData(prev => ({ ...prev, hasKids: true }))}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-gray-900 dark:text-slate-100">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasKids"
                        checked={formData.hasKids === false}
                        onChange={() => setFormData(prev => ({ ...prev, hasKids: false, numberOfKids: '' }))}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-gray-900 dark:text-slate-100">No</span>
                    </label>
                  </div>
                  {formData.hasKids && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Number of Children *</label>
                      <input
                        type="number"
                        name="numberOfKids"
                        value={formData.numberOfKids}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min="1"
                        max="20"
                        className={getInputClassName('numberOfKids')}
                        placeholder="Enter number of children"
                      />
                      <ErrorMessage field="numberOfKids" />
                    </div>
                  )}
                </div>
              )}
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
            <StepErrorAlert />
            <div className="space-y-6">
              <div className="relative" ref={addressDropdownRef}>
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
                    onChange={handleStreetChange}
                    onBlur={handleBlur}
                    className={getInputClassName('street', true)}
                    placeholder="Start typing to search addresses..."
                    autoComplete="off"
                  />
                </div>
                {showAddressSuggestions && filteredAddresses.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredAddresses.map((address, index) => (
                      <button
                        key={index}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectAddress(address)}
                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors border-b border-gray-200 dark:border-slate-700 last:border-0"
                      >
                        <p className="font-medium text-gray-900 dark:text-slate-100">{address.street}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
                <ErrorMessage field="street" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('city')}
                    placeholder="New York"
                  />
                  <ErrorMessage field="city" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('state')}
                    placeholder="NY"
                  />
                  <ErrorMessage field="state" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('zipCode')}
                    placeholder="10001"
                  />
                  <ErrorMessage field="zipCode" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('country')}
                    placeholder="United States"
                  />
                  <ErrorMessage field="country" />
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
              <p className="text-slate-600 dark:text-slate-300">Tell us more about your inquiry</p>
            </div>
            <StepErrorAlert />
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
                    onBlur={handleBlur}
                    className={getInputClassName('subject', true)}
                    placeholder="How can we help you?"
                  />
                </div>
                <ErrorMessage field="subject" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={getInputClassName('message')}
                  placeholder="Please provide details about your inquiry..."
                />
                <ErrorMessage field="message" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative" ref={contactDropdownRef}>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Preferred Contact Method</label>
                  <button
                    type="button"
                    onClick={() => setShowContactDropdown(!showContactDropdown)}
                    className="w-full px-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80 text-left flex justify-between items-center"
                  >
                    <span className={formData.preferredContact.length > 0 ? 'text-gray-900 dark:text-slate-100' : 'text-gray-400'}>
                      {formData.preferredContact.length > 0
                        ? formData.preferredContact.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')
                        : 'Select contact methods...'}
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${showContactDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showContactDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg">
                      {['email', 'phone'].map((method) => (
                        <label
                          key={method}
                          onMouseDown={(e) => e.preventDefault()}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-200 dark:border-slate-700 last:border-0"
                        >
                          <input
                            type="checkbox"
                            checked={formData.preferredContact.includes(method)}
                            onChange={(e) => {
                              const { checked } = e.target;
                              setFormData(prev => ({
                                ...prev,
                                preferredContact: checked
                                  ? [...prev.preferredContact, method]
                                  : prev.preferredContact.filter(m => m !== method)
                              }));
                            }}
                            className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="text-gray-900 dark:text-slate-100 capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Urgency</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                  >
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
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
                Review & Submit
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Please review your information before submitting</p>
            </div>
            <div className="card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formData.dob}</p>
                    <p><span className="font-medium">Gender:</span> {formData.gender && formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</p>
                    <p><span className="font-medium">Income:</span> {formData.income}</p>
                    <p><span className="font-medium">Marital Status:</span> {formData.maritalStatus && formData.maritalStatus.charAt(0).toUpperCase() + formData.maritalStatus.slice(1)}</p>
                    {formData.maritalStatus === 'married' && (
                      <p><span className="font-medium">Has Children:</span> {formData.hasKids ? 'Yes' : 'No'}</p>
                    )}
                    {formData.maritalStatus === 'married' && formData.hasKids && (
                      <p><span className="font-medium">Number of Children:</span> {formData.numberOfKids}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Address</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Street:</span> {formData.street}</p>
                    <p><span className="font-medium">City, State, ZIP:</span> {formData.city}, {formData.state} {formData.zipCode}</p>
                    <p><span className="font-medium">Country:</span> {formData.country}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Message Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Subject:</span> {formData.subject}</p>
                  <p><span className="font-medium">Message:</span> {formData.message}</p>
                  <p><span className="font-medium">Preferred Contact:</span> {formData.preferredContact.join(', ')}</p>
                  <p><span className="font-medium">Urgency:</span> {formData.urgency}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index + 1 === currentStep
                    ? 'bg-indigo-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1 < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="card p-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="btn-secondary px-6 py-3 rounded-xl font-medium"
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="btn-primary px-6 py-3 rounded-xl font-medium ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary px-6 py-3 rounded-xl font-medium ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepContactForm;
