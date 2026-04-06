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
  
  const { httpMethod, path: requestPath } = event;

  // Handle CORS preflight
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (httpMethod === 'GET') {
    try {
      const data = await store.getJSON(BLOB_KEY);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data || [])
      };
    } catch (error) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify([])
      };
    }
  }

  if (httpMethod === 'DELETE') {
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

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            success: true, 
            message: deletedCount > 0 ? `All ${deletedCount} contact(s) deleted successfully` : 'No contacts to delete',
            deletedCount 
          })
        };
      } catch (error) {
        console.error('Error deleting all contacts:', error);
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: false, message: 'Failed to delete all contacts' })
        };
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
          return {
            statusCode: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: false, message: 'No contacts found' })
          };
        }

        const initialLength = contacts.length;
        contacts = contacts.filter(contact => 
          contact.id.toString() !== contactId.toString()
        );

        if (contacts.length === initialLength) {
          return {
            statusCode: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: false, message: 'Contact not found' })
          };
        }

        await store.setJSON(BLOB_KEY, contacts);

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: true, message: 'Contact deleted successfully' })
        };
      } catch (error) {
        console.error('Error deleting contact:', error);
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: false, message: 'Failed to delete contact' })
        };
      }
    }

    // Delete multiple contacts
    try {
      const { ids } = JSON.parse(event.body);
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: false, message: 'No contact IDs provided' })
        };
      }
      
      let contacts = [];
      try {
        contacts = await store.getJSON(BLOB_KEY);
      } catch (error) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: false, message: 'No contacts found' })
        };
      }

      const initialLength = contacts.length;
      const idsAsStrings = ids.map(id => id.toString());
      contacts = contacts.filter(contact => 
        !idsAsStrings.includes(contact.id.toString())
      );
      const deletedCount = initialLength - contacts.length;

      if (deletedCount === 0) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: false, message: 'No contacts found with provided IDs' })
        };
      }

      await store.setJSON(BLOB_KEY, contacts);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true, 
          message: `${deletedCount} contact(s) deleted successfully`,
          deletedCount 
        })
      };
    } catch (error) {
      console.error('Error deleting contacts:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ success: false, message: 'Failed to delete contacts' })
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
