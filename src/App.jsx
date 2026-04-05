import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotificationsExamples from './pages/examples/NotificationsExamples'
import ContentsExamples from './pages/examples/ContentsExamples'
import FormsExamples from './pages/examples/FormsExamples'

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
        { label: 'Notifications Examples', href: '/examples/notifications' },
        { label: 'Contents Examples', href: '/examples/contents' },
        { label: 'Forms Examples', href: '/examples/forms' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header menuItems={menuItems} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/examples/notifications" element={<NotificationsExamples />} />
          <Route path="/examples/contents" element={<ContentsExamples />} />
          <Route path="/examples/forms" element={<FormsExamples />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
