import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-800 dark:to-slate-900 opacity-50"></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient text-balance">
              Welcome to Our Modern Website
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
              Experience the perfect blend of cutting-edge technology and elegant design, built with React and Vite for exceptional performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary text-lg px-8 py-4">
                Get Started
              </button>
              <button className="btn-outline text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-gray-50 dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">Why Choose Us</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We combine modern technology with best practices to deliver outstanding web experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Lightning Fast</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Built with Vite for instant development and optimized production builds that load in milliseconds.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Modern React</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Leveraging the latest React features and hooks for maintainable, scalable component architecture.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Beautiful Design</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Clean, intuitive interfaces with thoughtful micro-interactions and seamless user experience.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Fully Responsive</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Perfectly adapted for all devices, from mobile phones to desktop computers with fluid layouts.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Component-Based</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Modular, reusable components that make development faster and maintenance easier.
              </p>
            </div>
            
            <div className="card card-hover p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Best Practices</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Following industry standards and modern development patterns for robust, secure applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card p-12 text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-indigo-200 dark:border-slate-600">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient">Ready to Get Started?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Join us on this journey and experience the difference that modern web development can make.
            </p>
            <button className="btn-primary text-lg px-8 py-4 shadow-lg">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
