import React from 'react';
import PropTypes from 'prop-types';

const PageLayout = ({ 
  title, 
  description, 
  children, 
  maxWidth = 'max-w-7xl',
  showHeader = true 
}) => {
  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-slate-900">
      <div className="container-custom section-padding">
        <div className={`${maxWidth} mx-auto`}>
          {showHeader && (
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  showHeader: PropTypes.bool
};

export default PageLayout;
