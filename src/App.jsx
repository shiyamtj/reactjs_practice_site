import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ToastExamples from './pages/examples/ToastExamples'
import AlertExamples from './pages/examples/AlertExamples'
import { ToastProvider } from './contexts/ToastContext'
import { ContactProvider } from './contexts/ContactContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AlertProvider } from './contexts/AlertContext'
import ToastContainer from './components/ToastContainer'
import AlertContainer from './components/AlertContainer'

function AppContent() {
  const location = useLocation();
  
  const menuItems = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Examples',
      href: '/examples',
      submenu: [
        { label: 'Toast Examples', href: '/examples/toasts' },
        { label: 'Alert Examples', href: '/examples/alerts' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header menuItems={menuItems} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={
            <ContactProvider>
              <Contact />
            </ContactProvider>
          } />
          <Route path="/examples/toasts" element={<ToastExamples />} />
          <Route path="/examples/alerts" element={<AlertExamples />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AlertProvider>
          <Router>
            <AppContent />
          </Router>
          <ToastContainer />
          <AlertContainer />
        </AlertProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App
