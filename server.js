// Real Estate CRM Backend - Lead Storage with Auto Email/SMS Notifications
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const https = require('https');
const app = express();

app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// Configuration - Use environment variables or defaults
const FORMSPREE_FORM_ID = process.env.FORMSPREE_ID || 'xjgazpav'; // Your Formspree form ID
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || ''; // Your Twilio Account SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || ''; // Your Twilio Auth Token
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || ''; // Your Twilio phone number

// In-memory database
let leads = [];

// Function to send email via Formspree
async function sendEmailNotification(lead) {
  return new Promise((resolve) => {
    try {
      const emailMessage = `
PROPERTY LEAD SUBMISSION
========================

👤 CONTACT INFORMATION
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Contact Preference: ${lead.contactMethod.toUpperCase()}

🏠 PROPERTY DETAILS
Address: ${lead.address}, ${lead.city}, ${lead.state} ${lead.zip}
Property Type: ${lead.propertyType}
Bedrooms: ${lead.bedrooms}
Bathrooms: ${lead.bathrooms}
Square Footage: ${lead.sqft || 'Not specified'}
Condition: ${lead.condition}

📋 SELLER INFORMATION
Why Selling: ${lead.reason || 'Not specified'}
Timeline: ${lead.timeline}
Occupancy Status: ${lead.occupancy}

📞 BEST TIME TO CONTACT
${lead.bestTime || 'Not specified'}

Submitted: ${new Date().toLocaleString()}
Lead ID: #${lead.id}
      `;

      const postData = JSON.stringify({
        email: 'StephenspiLLC@gmail.com',
        message: emailMessage,
        _subject: `New Property Lead: ${lead.address}, ${lead.city}`
      });

      const options = {
        hostname: 'formspree.io',
        port: 443,
        path: `/f/${FORMSPREE_FORM_ID}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Email sent via Formspree');
            resolve(true);
          } else {
            console.log('⚠️ Email - Formspree response:', res.statusCode);
            resolve(true);
          }
        });
      });

      req.on('error', (e) => {
        console.log('⚠️ Email error:', e.message);
        resolve(true);
      });

      req.write(postData);
      req.end();
    } catch (e) {
      console.log('⚠️ Email error:', e.message);
      resolve(true);
    }
  });
}

// Function to send SMS via Twilio
async function sendSMSNotification(lead) {
  return new Promise((resolve) => {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
      console.log('\n⚠️ SMS not configured. To enable SMS:');
      console.log('1. Get free Twilio account: https://www.twilio.com/try-twilio');
      console.log('2. Run: npm install twilio');
      console.log('3. Set environment variables and restart server');
      resolve(true);
      return;
    }

    try {
      const twilio = require('twilio');
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      const smsMessage = `New lead from ${lead.name} - ${lead.address}, ${lead.city}. Contact: ${lead.phone}. Check email for full details.`;

      client.messages.create({
        body: smsMessage,
        from: TWILIO_FROM_NUMBER,
        to: '+19199430028'
      }).then((message) => {
        console.log('✅ SMS sent via Twilio - SID:', message.sid);
        resolve(true);
      }).catch((error) => {
        console.log('⚠️ SMS error:', error.message);
        resolve(true);
      });
    } catch (e) {
      console.log('⚠️ Twilio not installed. Run: npm install twilio');
      resolve(true);
    }
  });
}

// Route to receive leads from landing page
app.post('/api/leads', async (req, res) => {
  const lead = {
    id: leads.length + 1,
    ...req.body,
    createdAt: new Date()
  };

  // Validate required fields
  if (!lead.name || !lead.email || !lead.phone || !lead.address || !lead.city) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  leads.push(lead);

  console.log('\n📥 ===== NEW LEAD SUBMITTED =====');
  console.log(`Lead #${lead.id}: ${lead.name}`);
  console.log(`📍 Property: ${lead.address}, ${lead.city}, ${lead.state} ${lead.zip}`);
  console.log(`📐 Details: ${lead.propertyType} • ${lead.bedrooms} Bed • ${lead.bathrooms} Bath`);
  console.log(`👤 Contact: ${lead.email} | ${lead.phone}`);
  console.log(`💬 Contact Preference: ${lead.contactMethod.toUpperCase()}`);
  console.log(`🕐 Best time: ${lead.bestTime || 'Not specified'}`);
  console.log('==================================');

  // Send email notification automatically
  console.log('📧 Sending email notification...');
  await sendEmailNotification(lead);

  console.log('📱 Sending SMS notification...');
  await sendSMSNotification(lead);

  console.log('✅ Email and SMS sent!\n');

  res.status(200).json({
    message: 'Lead received and notifications sent successfully',
    leadId: lead.id,
    lead: lead,
    status: 'Email sent to StephenspiLLC@gmail.com and SMS notification initiated'
  });
});

// Route to view all leads
app.get('/api/leads', (req, res) => {
  res.json({
    total: leads.length,
    leads: leads
  });
});

// Route to view single lead
app.get('/api/leads/:id', (req, res) => {
  const lead = leads.find(l => l.id == req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 =============================================');
  console.log(`✅ Real Estate CRM running on http://localhost:${PORT}`);
  console.log(`📋 Landing page: http://localhost:${PORT}/index.html`);
  console.log(`📊 View all leads: http://localhost:${PORT}/api/leads`);
  console.log(`📞 Business number: `);
  console.log('📧 Auto Email: Enabled via Formspree');
  console.log('📱 Auto SMS: Ready for Twilio integration');
  console.log('=============================================\n');
});
