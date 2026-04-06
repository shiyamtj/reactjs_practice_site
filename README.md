# ReactJS Practice Site

A comprehensive React practice application built with modern tools and best practices. This project demonstrates various React patterns, component architecture, and development workflows.

## 🚀 Features

- **React 19** with modern hooks and patterns
- **Vite** for fast development and building
- **React Router** for client-side routing
- **TailwindCSS** for utility-first styling
- **Storybook** for component development and documentation
- **Playwright** for end-to-end testing
- **Express.js** backend API for contact management
- **Context API** for state management
- **Dark/Light theme** support (system-based)
- **Toast & Alert** notification systems

## 📁 Project Structure

```
reactjs_practice_site/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts for state management
│   ├── pages/              # Page components
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── public/                 # Public static files
├── tests/                  # Playwright test files
├── netlify/                # Netlify functions
├── .storybook/             # Storybook configuration
└── server.js               # Express API server
```

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **Vite 8.0.1** - Build tool and dev server
- **React Router 7.14.0** - Routing
- **TailwindCSS 4.2.2** - CSS framework
- **Lucide React 1.7.0** - Icon library
- **Storybook 10.3.4** - Component documentation

### Backend
- **Express 5.2.1** - API server
- **Node.js** - Runtime environment

### Development Tools
- **Playwright 1.59.1** - E2E testing
- **ESLint 9.39.4** - Code linting
- **Netlify CLI 24.9.0** - Deployment tool

## 🚀 Quick Start

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reactjs_practice_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Frontend only
   npm run dev
   
   # Full stack (frontend + backend)
   npm run dev:full
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📋 Available Scripts

### Development
- `npm run dev` - Start Vite development server
- `npm run server` - Start Express API server
- `npm run dev:full` - Run both frontend and backend concurrently

### Building
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing
- `npm run test` - Run Playwright tests
- `npm run test:headed` - Run tests with browser UI
- `npm run test:ui` - Run tests with Playwright UI
- `npm run test:debug` - Run tests in debug mode
- `npm run test:install` - Install Playwright browsers

### Storybook
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

### Code Quality
- `npm run lint` - Run ESLint

### Netlify
- `npm run netlify:dev` - Run Netlify development server
- `npm run netlify:build` - Build for Netlify deployment

## 🌐 Application Features

### Pages
- **Home** - Landing page with hero section
- **Contact** - Contact form with validation and submission
- **Examples** - Component examples and demonstrations
  - Toast Examples - Various toast notification patterns
  - Alert Examples - Different alert modal styles

### Components
- **Header** - Navigation with responsive menu
- **Footer** - Site footer with links
- **ToastContainer** - Global toast notification system
- **AlertContainer** - Global alert modal system
- **ConfirmModal** - Confirmation dialog component

### Contexts
- **ThemeContext** - Dark/light theme management
- **ToastContext** - Toast notification state
- **AlertContext** - Alert modal state
- **ContactContext** - Contact form state management

## 🔧 API Endpoints

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts
- `DELETE /api/contacts/:id` - Delete single contact
- `DELETE /api/contacts` - Delete multiple contacts
- `DELETE /api/contacts/all` - Delete all contacts

### Utility
- `GET /api/test` - Server health check

## 🎨 Theming

The application supports automatic dark and light themes:
- Theme automatically follows system preference (prefers-color-scheme)
- No manual theme switching - system-based only
- TailwindCSS dark mode classes for automatic styling
- Smooth transitions between theme changes

## 📱 Responsive Design

- Mobile-first approach using TailwindCSS
- Responsive navigation menu
- Optimized layouts for different screen sizes

## 🧪 Testing

### Playwright Tests
Tests are located in the `tests/` directory:
- Form submission tests
- Navigation tests
- Component interaction tests

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/form-submission.spec.js
```

## 📚 Storybook

Explore components in isolation:
```bash
npm run storybook
```
Visit http://localhost:6006 to view the Storybook interface.

## 🚀 Deployment

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy the dist folder to your hosting service
```

### Environment Variables
- No environment variables required for basic functionality
- API runs on localhost:3001 in development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is private and for practice purposes only.

## 🔍 Troubleshooting

### Common Issues

**Port already in use**
- Change the port in `server.js` or kill the process using the port

**Build fails**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version matches `.nvmrc`

**Tests fail**
- Run `npm run test:install` to install Playwright browsers
- Ensure the development server is running for E2E tests

**Storybook doesn't start**
- Check that all components are properly exported
- Verify Storybook configuration in `.storybook/`

### Getting Help

- Check the console for error messages
- Review the network tab for API issues
- Ensure both frontend and backend are running when testing full functionality

## 📞 Contact

For questions or issues with this practice project, please refer to the project documentation or create an issue in the repository.
