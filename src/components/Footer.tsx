import React from 'react';

interface FooterProps {
  copyright?: string;
  company?: string;
}

const Footer: React.FC<FooterProps> = ({ copyright = '2024', company = 'Your Company' }) => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-6 text-gradient">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Creating amazing web experiences with React and modern technologies. 
              We focus on performance, accessibility, and beautiful design.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center hover:bg-indigo-500/30 transition-colors cursor-pointer">
                <span>📧</span>
              </div>
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center hover:bg-indigo-500/30 transition-colors cursor-pointer">
                <span>💼</span>
              </div>
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center hover:bg-indigo-500/30 transition-colors cursor-pointer">
                <span>🐦</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-6 text-gradient">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-6 text-gradient">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📧</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white font-medium">info@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📱</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white font-medium">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📍</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium">123 Web Street, Tech City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {copyright} {company}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-gray-300 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
