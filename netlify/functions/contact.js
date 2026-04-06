import { getStore } from '@netlify/blobs';

const STORE_NAME = 'contacts';
const BLOB_KEY = 'contacts.json';

// Get site-scoped store - persists across deploys
function getContactsStore() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

// Initialize contacts blob if it doesn't exist
async function initializeContactsBlob(store) {
  try {
    const existing = await store.get(BLOB_KEY);
    if (!existing) {
      console.log("Non existing blob found, creating new one");
      await store.setJSON(BLOB_KEY, []);
    }
  } catch (error) {
    console.log("Error initializing blob:", error);
    await store.setJSON(BLOB_KEY, []);
  }
}

export default async (request) => {
  // Get the blob store
  const store = getContactsStore();
  
  // Initialize contacts blob on first invocation
  await initializeContactsBlob(store);

  const method = request.method;
  const url = new URL(request.url);
  const requestPath = url.pathname.replace("/api/contact", "") || "/";

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (method === 'POST') {
    try {
      const body = await request.json();
      const contactData = {
        ...body,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };

      // Read existing contacts from blob
      let contacts = [];
      try {
        const blob = await store.get(BLOB_KEY);
        contacts = JSON.parse(blob);
        console.log("Existing contacts:", JSON.stringify(contacts, null, 2));
      } catch (error) {
        console.log("Error reading contacts:", error);
        contacts = [];
      }

      // Check if limit is reached (20 records)
      if (contacts.length >= 20) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Contact limit reached. Maximum 20 contacts allowed.' 
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }

      // Add new contact
      contacts.push(contactData);

      // Write back to blob
      await store.setJSON(BLOB_KEY, contacts);

      return new Response(
        JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (error) {
      console.error('Error saving contact:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to save contact data' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  }

  if (method === 'DELETE') {
    // Delete single contact by ID
    const idMatch = requestPath.match(/^\/(.+)$/);
    if (idMatch) {
      try {
        const contactId = idMatch[1];

        let contacts = [];
        try {
          const blob = await store.get(BLOB_KEY);
          contacts = JSON.parse(blob);
        } catch (error) {
          return new Response(
            JSON.stringify({ success: false, message: 'No contacts found' }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        const initialLength = contacts.length;
        contacts = contacts.filter(
          (contact) => contact.id.toString() !== contactId.toString()
        );

        if (contacts.length === initialLength) {
          return new Response(
            JSON.stringify({ success: false, message: 'Contact not found' }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        await store.setJSON(BLOB_KEY, contacts);

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Contact deleted successfully'
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      } catch (error) {
        console.error('Error deleting contact:', error);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Failed to delete contact'
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }
    }
  }

  return new Response(
    JSON.stringify({ message: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};
