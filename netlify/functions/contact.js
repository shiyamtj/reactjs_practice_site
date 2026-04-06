import { getStore } from '@netlify/blobs';

const STORE_NAME = 'contacts';
const BLOB_KEY = 'contacts.json';

// Get store with environment credentials
function getContactsStore() {
  return getStore({
    name: STORE_NAME,
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_BLOBS_TOKEN
  });
}

// Initialize contacts blob if it doesn't exist
async function initializeContactsBlob(store) {
  try {
    const existing = await store.get(BLOB_KEY);
    if (!existing) {
      await store.setJSON(BLOB_KEY, []);
    }
  } catch (error) {
    await store.setJSON(BLOB_KEY, []);
  }
}

export async function handler(event, context) {
  // Get the blob store with credentials
  const store = getContactsStore();
  
  // Initialize contacts blob on first invocation
  await initializeContactsBlob(store);
  
  const { httpMethod } = event;

  // Handle CORS preflight
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (httpMethod === 'POST') {
    try {
      const contactData = {
        ...JSON.parse(event.body),
        id: Date.now(),
        timestamp: new Date().toISOString()
      };

      // Read existing contacts from blob
      let contacts = [];
      try {
        contacts = await store.getJSON(BLOB_KEY);
      } catch (error) {
        contacts = [];
      }

      // Check if limit is reached (20 records)
      if (contacts.length >= 20) {
        return {
          statusCode: 429,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            success: false, 
            message: 'Contact limit reached. Maximum 20 contacts allowed.' 
          })
        };
      }

      // Add new contact
      contacts.push(contactData);

      // Write back to blob
      await store.setJSON(BLOB_KEY, contacts);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ success: true, message: 'Contact form submitted successfully' })
      };
    } catch (error) {
      console.error('Error saving contact:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ success: false, message: 'Failed to save contact data' })
      };
    }
  }

  return {
    statusCode: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ message: 'Method not allowed' })
  };
}
