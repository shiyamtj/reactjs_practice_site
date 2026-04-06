import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join('/tmp', 'contacts.json');

// Initialize contacts file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function handler(event, context) {
  // Initialize data file on first invocation
  await initializeDataFile();
  
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
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: data
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
    if (requestPath.endsWith('/all')) {
      try {
        let deletedCount = 0;
        try {
          const data = await fs.readFile(DATA_FILE, 'utf8');
          const contacts = JSON.parse(data);
          deletedCount = contacts.length;
        } catch (error) {
          deletedCount = 0;
        }

        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));

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
    const idMatch = requestPath.match(/\/contacts\/(.+)$/);
    if (idMatch) {
      try {
        const contactId = idMatch[1];
        
        let contacts = [];
        try {
          const data = await fs.readFile(DATA_FILE, 'utf8');
          contacts = JSON.parse(data);
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

        await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

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
        const data = await fs.readFile(DATA_FILE, 'utf8');
        contacts = JSON.parse(data);
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

      await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

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
