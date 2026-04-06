import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'src', 'data', 'contacts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize contacts file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    // Read existing contacts
    let contacts = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty
      contacts = [];
    }

    // Check if limit is reached (20 records)
    if (contacts.length >= 20) {
      return res.status(429).json({ 
        success: false, 
        message: 'Contact limit reached. Maximum 20 contacts allowed.' 
      });
    }

    // Add new contact
    contacts.push(contactData);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Failed to save contact data' });
  }
});


// Get all contacts (for testing)
app.get('/api/contacts', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json([]);
  }
});

// Delete all contacts
app.delete('/api/contacts/all', async (req, res) => {
  try {
    // Read existing contacts to get count
    let contacts = [];
    let deletedCount = 0;
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      contacts = JSON.parse(data);
      deletedCount = contacts.length;
    } catch (error) {
      // File doesn't exist or is empty, which is fine
      deletedCount = 0;
    }

    // Write empty array to file
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));

    res.json({ 
      success: true, 
      message: deletedCount > 0 ? `All ${deletedCount} contact(s) deleted successfully` : 'No contacts to delete',
      deletedCount 
    });
  } catch (error) {
    console.error('Error deleting all contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to delete all contacts' });
  }
});

// Delete single contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    
    // Read existing contacts
    let contacts = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      return res.status(404).json({ success: false, message: 'No contacts found' });
    }

    // Filter out the contact to delete (handle both string and number IDs)
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => 
      contact.id.toString() !== contactId.toString()
    );

    if (contacts.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contact' });
  }
});

// Delete multiple contacts
app.delete('/api/contacts', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No contact IDs provided' });
    }
    
    // Read existing contacts
    let contacts = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      return res.status(404).json({ success: false, message: 'No contacts found' });
    }

    // Filter out the contacts to delete (handle both string and number IDs)
    const initialLength = contacts.length;
    const idsAsStrings = ids.map(id => id.toString());
    contacts = contacts.filter(contact => 
      !idsAsStrings.includes(contact.id.toString())
    );
    const deletedCount = initialLength - contacts.length;

    if (deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No contacts found with provided IDs' });
    }

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));

    res.json({ 
      success: true, 
      message: `${deletedCount} contact(s) deleted successfully`,
      deletedCount 
    });
  } catch (error) {
    console.error('Error deleting contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contacts' });
  }
});

// Test endpoint to verify server is running updated code
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running updated code', timestamp: new Date().toISOString() });
});

// Start server
initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
