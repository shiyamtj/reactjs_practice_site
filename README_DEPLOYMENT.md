# Netlify Deployment Guide

## Option 1: Serverless Functions (Recommended)

### Prerequisites
- Netlify CLI installed: `npm install -g netlify-cli`
- Netlify account

### Setup Steps

1. **Install Netlify CLI locally**
   ```bash
   npm install --save-dev netlify-cli
   ```

2. **Test locally**
   ```bash
   npm run netlify:dev
   ```

3. **Deploy to Netlify**
   ```bash
   # Login to Netlify
   netlify login
   
   # Initialize site
   netlify init
   
   # Deploy
   netlify deploy --prod
   ```

### What's Configured
- **API Routes**: Converted to Netlify Functions in `netlify/functions/api/`
- **Redirects**: `/api/*` requests redirect to functions
- **Build**: Vite build output in `dist/`
- **SPA Support**: All routes redirect to `index.html`

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts
- `DELETE /api/contacts/:id` - Delete single contact
- `DELETE /api/contacts/all` - Delete all contacts
- `DELETE /api/contacts` - Delete multiple contacts
- `GET /api/test` - Test endpoint

## Option 2: Separate Backend Deployment

### Backend (Vercel/Heroku/Railway)
Deploy the Express server separately and update the API base URL in your React app.

### Frontend (Netlify)
1. Update API base URL in your React components
2. Deploy only the frontend to Netlify

## Environment Variables

For production, you may want to add:
- `VITE_API_BASE_URL` - API endpoint URL
- Any other required environment variables

## Notes

- Serverless functions use `/tmp` for temporary storage
- Contact data persists between function calls but may be cleared periodically
- For production, consider using a database instead of file storage

## Testing

After deployment, test:
1. Contact form submission
2. Contact retrieval
3. Contact deletion
4. SPA navigation
