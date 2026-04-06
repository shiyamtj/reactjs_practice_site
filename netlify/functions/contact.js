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
  
  const { httpMethod } = event;

  if (httpMethod === 'POST') {
    try {
      const contactData = {
        ...JSON.parse(event.body),
        id: Date.now(),
        timestamp: new Date().toISOString()
      };

      // Read existing contacts
      let contacts = [];
      try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        contacts = JSON.parse(data);
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

      // Write back to file
      await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

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
