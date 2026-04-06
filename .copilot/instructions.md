# GitHub Copilot Instructions

This file contains specific instructions for GitHub Copilot to understand the project structure, coding patterns, and conventions used in this ReactJS practice site.

## 🏗️ Project Architecture

### Technology Stack
- **React 19** with functional components and hooks
- **Vite** as build tool and dev server
- **React Router 7** for client-side routing
- **TailwindCSS 4** for styling (utility-first approach)
- **Express.js** backend API on port 3001
- **Storybook** for component documentation
- **Playwright** for E2E testing

### File Structure Preferences
```
src/
├── components/     # Reusable UI components (PascalCase)
├── contexts/      # React contexts (PascalCase + Context)
├── pages/         # Page components (PascalCase)
└── assets/        # Static assets
```

## 🎯 Coding Standards

### Component Guidelines
- Use functional components with React hooks
- Export components as default: `export default ComponentName`
- Use PascalCase for component names and files
- Include PropTypes for component props
- Use descriptive prop names

### State Management
- Use React Context API for global state
- Context files should be in `src/contexts/`
- Follow naming pattern: `XxxContext.jsx`
- Create custom hooks for context consumption: `useXxx()`

### Styling Conventions
- Use TailwindCSS utility classes exclusively
- Apply responsive design with mobile-first approach
- Use semantic HTML5 elements
- Implement dark theme support with `dark:` prefixes

### API Integration
- Use axios for HTTP requests
- Handle loading and error states
- Use async/await for API calls
- Implement proper error handling with user feedback

## 📝 Code Patterns

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';

function ComponentName({ prop1, prop2 }) {
  // Component logic here
  
  return (
    <div className="utility-classes">
      {/* Component JSX */}
    </div>
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.type.isRequired,
  prop2: PropTypes.type
};

export default ComponentName;
```

### Context Pattern
```jsx
import React, { createContext, useContext, useReducer } from 'react';

const XxxContext = createContext();

function xxxReducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* updated state */ };
    default:
      return state;
  }
}

export function XxxProvider({ children }) {
  const [state, dispatch] = useReducer(xxxReducer, initialState);
  
  return (
    <XxxContext.Provider value={{ state, dispatch }}>
      {children}
    </XxxContext.Provider>
  );
}

export function useXxx() {
  const context = useContext(XxxContext);
  if (!context) {
    throw new Error('useXxx must be used within XxxProvider');
  }
  return context;
}
```

### API Service Pattern
```jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const xxxService = {
  async getXxx() {
    try {
      const response = await axios.get(`${API_BASE_URL}/xxx`);
      return response.data;
    } catch (error) {
      console.error('Error fetching xxx:', error);
      throw error;
    }
  },
  
  async createXxx(data) {
    try {
      const response = await axios.post(`${API_BASE_URL}/xxx`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating xxx:', error);
      throw error;
    }
  }
};
```

## 🎨 UI/UX Guidelines

### Design Principles
- Mobile-first responsive design
- Consistent spacing using TailwindCSS scale
- Smooth transitions and micro-interactions
- Accessible color contrasts
- Loading states for async operations

### Theme Implementation
- Support both light and dark themes automatically
- Use `dark:` prefix for dark mode styles
- Theme follows system preference only (no manual switching)
- ThemeContext provides read-only theme state
- No localStorage or toggle functionality needed

### Notification Systems
- Use ToastContext for temporary notifications
- Use AlertContext for important confirmations
- Provide clear action buttons and messages
- Auto-dismiss toasts after reasonable time

## 🧪 Testing Guidelines

### Playwright Tests
- Write tests in `tests/` directory
- Use descriptive test names
- Test user flows, not just component rendering
- Include assertions for UI changes
- Use data-testid attributes when necessary

### Test Structure
```javascript
import { test, expect } from '@playwright/test';

test('should perform user action', async ({ page }) => {
  await page.goto('/');
  
  // Test steps
  await page.click('[data-testid="button"]');
  
  // Assertions
  await expect(page.locator('[data-testid="result"]')).toBeVisible();
});
```

## 🔧 Development Workflow

### Component Development
1. Create component in appropriate directory
2. Add PropTypes for type checking
3. Write Storybook stories for documentation
4. Add Playwright tests for user interactions
5. Test responsive design

### API Development
1. Define API endpoints in `server.js`
2. Implement proper error handling
3. Add input validation
4. Test with tools like Postman or curl
5. Update frontend to use new endpoints

### Code Review Checklist
- Components follow naming conventions
- PropTypes are defined
- Error handling is implemented
- Responsive design is considered
- Tests are written for new features
- Documentation is updated

## 📦 Package Management

### Dependencies
- Prefer specific versions over wildcards
- Keep dependencies minimal
- Review security updates regularly
- Use npm scripts for common tasks

### Scripts Usage
- `npm run dev` - Development server
- `npm run dev:full` - Full stack development
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run storybook` - Component documentation

## 🚨 Common Pitfalls to Avoid

### React Anti-Patterns
- Don't use setState in render
- Avoid direct DOM manipulation
- Don't mutate state directly
- Use keys properly in lists

### CSS Issues
- Avoid inline styles (use TailwindCSS)
- Don't use !important
- Ensure responsive breakpoints work
- Test dark mode styles

### API Mistakes
- Don't forget error handling
- Avoid hardcoded URLs
- Don't ignore loading states
- Test edge cases

## 🎯 Performance Considerations

### Optimization Tips
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Lazy load routes when appropriate
- Optimize images and assets
- Use production builds for testing performance

### Bundle Size
- Import only needed functions from libraries
- Avoid large dependencies
- Use dynamic imports for code splitting
- Monitor bundle size regularly

## 🔍 Debugging Guidelines

### Common Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Ensure context providers wrap components
- Test responsive design in dev tools
- Check network tab for failed requests

### Debug Tools
- React Developer Tools
- Browser DevTools
- Playwright test runner
- Storybook for component isolation

## 📚 Learning Resources

When suggesting code or patterns, reference:
- React 19 documentation
- TailwindCSS utility classes
- Vite configuration options
- Playwright best practices
- Express.js API patterns

## 🎨 Component Library

### Existing Components
- `Header` - Navigation with menu
- `Footer` - Site footer
- `ToastContainer` - Notification system
- `AlertContainer` - Modal system
- `ConfirmModal` - Confirmation dialogs

### Reusable Patterns
- Form components with validation
- Loading states and skeletons
- Error boundaries
- Responsive layouts
- Theme-aware components

Remember to maintain consistency with existing patterns and always test your changes before suggesting them!
