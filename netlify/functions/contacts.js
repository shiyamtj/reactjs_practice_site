import { getDeployStore } from '@netlify/blobs';

const STORE_NAME = 'contacts';
const BLOB_KEY = 'contacts.json';

// Get deploy store - automatically configured
function getContactsStore() {
  return getDeployStore({ name: STORE_NAME });
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

export default async (request, context) => {
  // Get the blob store
  const store = getContactsStore();
  
  // Initialize contacts blob on first invocation
  await initializeContactsBlob(store);

  const method = request.method;
  const url = new URL(request.url);
  const requestPath = url.pathname.replace('/api/contacts', '') || '/';

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (method === 'GET') {
    try {
      const data = await store.getJSON(BLOB_KEY);
      return new Response(
        JSON.stringify(data || []),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify([]),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  }

  if (method === 'DELETE') {
    // Delete all contacts
    if (requestPath === '/all') {
      try {
        let deletedCount = 0;
        try {
          const contacts = await store.getJSON(BLOB_KEY);
          deletedCount = contacts ? contacts.length : 0;
        } catch (error) {
          deletedCount = 0;
        }

        await store.setJSON(BLOB_KEY, []);

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: deletedCount > 0 ? `All ${deletedCount} contact(s) deleted successfully` : 'No contacts to delete',
            deletedCount 
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
        console.error('Error deleting all contacts:', error);
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to delete all contacts' }),
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

    // Delete single contact by ID
    const idMatch = requestPath.match(/^\/(.+)$/);
    if (idMatch && requestPath !== '/all') {
      try {
        const contactId = idMatch[1];
        
        let contacts = [];
        try {
          contacts = await store.getJSON(BLOB_KEY);
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
        contacts = contacts.filter(contact => 
          contact.id.toString() !== contactId.toString()
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
          JSON.stringify({ success: true, message: 'Contact deleted successfully' }),
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
          JSON.stringify({ success: false, message: 'Failed to delete contact' }),
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

    // Delete multiple contacts
    try {
      const { ids } = await request.json();
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: 'No contact IDs provided' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }
      
      let contacts = [];
      try {
        contacts = await store.getJSON(BLOB_KEY);
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
      const idsAsStrings = ids.map(id => id.toString());
      contacts = contacts.filter(contact => 
        !idsAsStrings.includes(contact.id.toString())
      );
      const deletedCount = initialLength - contacts.length;

      if (deletedCount === 0) {
        return new Response(
          JSON.stringify({ success: false, message: 'No contacts found with provided IDs' }),
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
          message: `${deletedCount} contact(s) deleted successfully`,
          deletedCount 
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
      console.error('Error deleting contacts:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to delete contacts' }),
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
