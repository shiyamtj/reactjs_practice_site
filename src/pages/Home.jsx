import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const Home = () => {
  return (
    <PageLayout 
      title="Welcome to Your React Practice Lab"
      description="Master modern web development through hands-on practice with interactive examples and real-world projects."
      showHeader={false}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-800 dark:to-slate-900 opacity-50"></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">Learn React by Building</h1>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Practice modern web development with interactive examples, hands-on projects, and real-world scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/examples/toasts" className="btn-primary text-lg px-8 py-4 inline-block text-center">
                Explore Toast Examples
              </Link>
              <Link to="/examples/alerts" className="btn-outline text-lg px-8 py-4 inline-block text-center">
                Explore Alert Examples
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-600/20 rounded-full blur-2xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-gray-50 dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">What You'll Learn</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Build practical skills through interactive practice exercises and real-world projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔔</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Toast Notifications</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Master toast notification patterns with multiple types, custom durations, and interactive examples.
              </p>
              <Link to="/examples/toasts" className="btn-outline mt-4 inline-block">
                Try Toast Examples
              </Link>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚠️</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Alert Components</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Learn to build flexible alert systems with different types, custom styling, and user interactions.
              </p>
              <Link to="/examples/alerts" className="btn-outline mt-4 inline-block">
                Try Alert Examples
              </Link>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Multi-Step Forms</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Build complex multi-step contact forms with validation, state management, and user-friendly navigation.
              </p>
              <Link to="/contact" className="btn-outline mt-4 inline-block">
                Try Contact Form
              </Link>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Modern Styling</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Experience beautiful UI design with Tailwind CSS, dark mode support, and smooth transitions.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Context Management</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Learn React Context patterns for state management with Toast, Alert, and Theme implementations.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Contact Management</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Manage contact submissions with CRUD operations, validation, and data persistence.
              </p>
              <Link to="/contact" className="btn-outline mt-4 inline-block">
                View Contact System
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card p-12 text-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-600">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient">Ready to Start Learning?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Begin your journey to becoming a proficient React developer with our hands-on practice environment.
            </p>
            <Link to="/examples/toasts" className="btn-primary text-lg px-8 py-4 shadow-lg inline-block">
              Start Your Learning Journey
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
