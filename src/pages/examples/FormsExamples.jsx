import React, { useState, useEffect } from 'react';

const FormsExamples = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: '',
    newsletter: false,
    terms: false,
    gender: '',
    country: '',
    hobbies: [],
    rating: 3,
    dateOfBirth: '',
    color: '#3B82F6'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 
    'Germany', 'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  const hobbies = [
    'Reading', 'Sports', 'Music', 'Travel', 'Cooking', 
    'Gaming', 'Photography', 'Art', 'Programming', 'Gardening'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'hobbies') {
        setFormData(prev => ({
          ...prev,
          hobbies: checked 
            ? [...prev.hobbies, value]
            : prev.hobbies.filter(h => h !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.terms) newErrors.terms = 'You must accept the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Form submitted successfully!');
      console.log('Form data:', formData);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      bio: '',
      newsletter: false,
      terms: false,
      gender: '',
      country: '',
      hobbies: [],
      rating: 3,
      dateOfBirth: '',
      color: '#3B82F6'
    });
    setErrors({});
    setSubmitMessage('');
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gradient">
            Forms Examples
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl">
            Comprehensive form examples showcasing various input types, validation patterns, and user interactions in React.
          </p>

          {/* Main Registration Form */}
          <section className="mb-16">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50">User Registration Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        errors.password ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Gender and Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Gender
                    </label>
                    <div className="space-y-2">
                      {['Male', 'Female', 'Other', 'Prefer not to say'].map((gender) => (
                        <label key={gender} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={gender.toLowerCase()}
                            checked={formData.gender === gender.toLowerCase()}
                            onChange={handleChange}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-slate-700 dark:text-slate-300">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Hobbies
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {hobbies.map((hobby) => (
                      <label key={hobby} className="flex items-center">
                        <input
                          type="checkbox"
                          name="hobbies"
                          value={hobby}
                          checked={formData.hobbies.includes(hobby)}
                          onChange={handleChange}
                          className="mr-2 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{hobby}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Rating: {formData.rating} stars
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className={`text-2xl transition-colors duration-200 ${
                          star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        } hover:text-yellow-400`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date and Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                      Favorite Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="h-12 w-20 border border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer"
                      />
                      <span className="text-slate-600 dark:text-slate-400">{formData.color}</span>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="mr-3 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-700 dark:text-slate-300">
                      Subscribe to our newsletter for updates and tips
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className={`mr-3 text-indigo-600 focus:ring-indigo-500 ${
                        errors.terms ? 'border-red-500' : ''
                      }`}
                    />
                    <span className="text-slate-700 dark:text-slate-300">
                      I agree to the Terms of Service and Privacy Policy *
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary py-3 px-8 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Register Account'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-outline py-3 px-8 text-lg font-medium"
                  >
                    Reset Form
                  </button>
                </div>

                {/* Success Message */}
                {submitMessage && (
                  <div className="bg-green-50 dark:bg-emerald-900/20 border-l-4 border-green-500 dark:border-emerald-500 p-4 rounded-r-xl">
                    <p className="text-green-800 dark:text-emerald-200 font-medium">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </section>

          {/* Form States */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Form States & Patterns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Loading State */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Loading State</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    <span className="text-slate-600 dark:text-slate-300">Processing your request...</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-3/5"></div>
                  </div>
                </div>
              </div>

              {/* Success State */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Success State</h3>
                <div className="bg-green-50 dark:bg-emerald-900/20 border border-green-200 dark:border-emerald-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-800 dark:text-emerald-200 font-medium">Form submitted successfully!</span>
                  </div>
                </div>
              </div>

              {/* Error State */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Error State</h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-red-800 dark:text-red-200 font-medium">Submission failed</span>
                      <p className="text-red-600 dark:text-red-300 text-sm mt-1">Please check your input and try again.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disabled State */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Disabled State</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    disabled
                    placeholder="Disabled input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="btn-primary py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Disabled Button
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Implementation Examples</h2>
            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Form Validation Hook</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                  <code>{`const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const validate = (rules) => {
    const newErrors = {};
    Object.keys(rules).forEach(field => {
      if (!values[field]) {
        newErrors[field] = \`\${field} is required\`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return { values, errors, handleChange, validate };
};`}</code>
                </pre>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Custom Input Component</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                  <code>{`const FormInput = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        className={\`w-full px-4 py-3 border rounded-xl 
          \${error ? 'border-red-500' : 'border-gray-300'}\`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FormsExamples;
