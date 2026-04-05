import React, { useState } from 'react';

const ContentsExamples = () => {
  const [activeTab, setActiveTab] = useState('cards');
  const [selectedCard, setSelectedCard] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(null);

  const cards = [
    { id: 1, title: 'Card Component', description: 'A flexible card component with header, body, and footer sections.', icon: '🎴' },
    { id: 2, title: 'Modal Component', description: 'Overlay dialog component for user interactions and confirmations.', icon: '🪟' },
    { id: 3, title: 'Accordion Component', description: 'Collapsible content sections for organizing information.', icon: '📁' },
    { id: 4, title: 'Tabs Component', description: 'Navigation tabs for switching between different content views.', icon: '📑' },
    { id: 5, title: 'Carousel Component', description: 'Sliding content carousel for showcasing multiple items.', icon: '🎠' },
    { id: 6, title: 'Breadcrumb Component', description: 'Navigation breadcrumb for showing user location hierarchy.', icon: '🍞' }
  ];

  const accordionItems = [
    {
      id: 1,
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.'
    },
    {
      id: 2,
      title: 'What are React Hooks?',
      content: 'Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, and useContext.'
    },
    {
      id: 3,
      title: 'What is JSX?',
      content: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and intuitive.'
    }
  ];

  const toggleAccordion = (id) => {
    setAccordionOpen(accordionOpen === id ? null : id);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gradient">
            Content Components Examples
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl">
            Explore various React content components with interactive examples and best practices.
          </p>

          {/* Tab Navigation */}
          <section className="mb-16">
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {['cards', 'modals', 'accordions', 'tabs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Cards Tab */}
            {activeTab === 'cards' && (
              <div className="space-y-8">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Interactive Card Grid</h2>
                  <p className="text-gray-600 mb-8">
                    Click on any card to see the selection state and interaction patterns:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCard(card.id)}
                        className={`card p-6 cursor-pointer transition-all duration-200 ${
                          selectedCard === card.id
                            ? 'ring-2 ring-indigo-500 bg-indigo-50'
                            : 'hover:shadow-lg'
                        }`}
                      >
                        <div className="text-4xl mb-4 text-center">{card.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{card.title}</h3>
                        <p className="text-gray-600 text-sm">{card.description}</p>
                        {selectedCard === card.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <span className="text-indigo-600 font-medium text-sm">✓ Selected</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedCard && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                      <p className="text-indigo-800">
                        <strong>Selected:</strong> {cards.find(c => c.id === selectedCard)?.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modals Tab */}
            {activeTab === 'modals' && (
              <div className="space-y-8">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Modal Components</h2>
                  <p className="text-gray-600 mb-8">
                    Different modal patterns for various use cases:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Confirmation Modal</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex space-x-3">
                          <button className="btn-danger text-sm">Delete</button>
                          <button className="btn-outline text-sm">Cancel</button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Form Modal</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                        />
                        <textarea
                          placeholder="Enter your message"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                          rows={3}
                        />
                        <button className="btn-primary text-sm w-full">Submit</button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Image Modal</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                          <span className="text-gray-500">Image Preview</span>
                        </div>
                        <p className="text-sm text-gray-600 text-center">Click to view full size</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Info Modal</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2">About This Feature</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          This modal provides additional information about the current feature or context.
                        </p>
                        <button className="btn-primary text-sm w-full">Got it</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accordions Tab */}
            {activeTab === 'accordions' && (
              <div className="space-y-8">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Accordion Components</h2>
                  <p className="text-gray-600 mb-8">
                    Click on accordion items to expand/collapse content:
                  </p>
                  
                  <div className="space-y-4">
                    {accordionItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                              accordionOpen === item.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            accordionOpen === item.id ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600">{item.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tabs Tab */}
            {activeTab === 'tabs' && (
              <div className="space-y-8">
                <div className="card p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Tab Components</h2>
                  <p className="text-gray-600 mb-8">
                    Example of nested tab navigation within content:
                  </p>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50">
                      <div className="flex">
                        {['Overview', 'Features', 'Documentation', 'Examples'].map((tab, index) => (
                          <button
                            key={tab}
                            className={`px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                              index === 0
                                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Overview</h3>
                      <p className="text-gray-600 mb-4">
                        This is the overview content for the tab component. Each tab can contain different types of content including text, images, forms, or other interactive elements.
                      </p>
                      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                        <p className="text-indigo-800">
                          <strong>Tip:</strong> Tab components are great for organizing related content in a compact space.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Component Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">More Content Components</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Breadcrumb Example */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Breadcrumb Navigation</h3>
                <nav className="flex items-center space-x-2 text-sm mb-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                  <span className="text-gray-400">/</span>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Components</a>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">Content</span>
                </nav>
                <p className="text-gray-600 text-sm">
                  Breadcrumbs help users understand their current location in the site hierarchy.
                </p>
              </div>

              {/* Pagination Example */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Pagination Component</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    ←
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                    →
                  </button>
                </div>
                <p className="text-gray-600 text-sm">
                  Pagination allows users to navigate through large sets of content.
                </p>
              </div>

              {/* Progress Bar Example */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Progress Indicators</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">File Upload</span>
                      <span className="text-gray-900 font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Processing</span>
                      <span className="text-gray-900 font-medium">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Progress bars provide visual feedback for ongoing operations.
                </p>
              </div>

              {/* Badge Example */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Badge Components</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">New</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Urgent</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Archived</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Badges provide visual status indicators and categorization.
                </p>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Implementation Examples</h2>
            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Card Component</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                  <code>{`const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={\`card \${className} \${onClick ? 'cursor-pointer' : ''}\`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};`}</code>
                </pre>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Accordion Component</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                  <code>{`const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setOpenIndex(index)}>
            {item.title}
          </button>
          {openIndex === index && (
            <div>{item.content}</div>
          )}
        </div>
      ))}
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

export default ContentsExamples;
