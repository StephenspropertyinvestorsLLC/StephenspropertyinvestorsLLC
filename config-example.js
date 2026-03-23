// ============================================================================
// CONFIGURATION TEMPLATE - Email & SMS Setup
// ============================================================================
//
// This file shows where to add your email and SMS API credentials.
// Choose ONE email service and ONE SMS service, then add your credentials
// to your server.js file or use environment variables.
//
// NEVER commit real API keys to version control!
// Use environment variables instead.
// ============================================================================

// ============================================================================
// OPTION 1: Email via Formspree (Recommended - Easiest)
// ============================================================================
// No signup required beyond creating a free form at formspree.io

const FORMSPREE_EMAIL_CONFIG = {
  // Go to https://formspree.io and create a form
  // Copy your form ID here (e.g., 'f/xojvenwp')
  formId: process.env.FORMSPREE_ID || 'f/your_form_id_here',
  endpoint: 'https://formspree.io'
};

// ============================================================================
// OPTION 2: Email via Gmail (Gmail App Password Method)
// ============================================================================
// Requires: 2FA enabled on Gmail account

const GMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'StephenspiLLC@gmail.com',
    // Get this from: https://myaccount.google.com/apppasswords
    pass: process.env.GMAIL_APP_PASSWORD || 'your_16_character_app_password'
  }
};

// ============================================================================
// OPTION 3: Email via SendGrid (Free Tier: 100 emails/day)
// ============================================================================
// Requires: Free SendGrid account

const SENDGRID_CONFIG = {
  apiKey: process.env.SENDGRID_API_KEY || 'SG.your_api_key_here',
  fromEmail: 'noreply@yourbusiness.com',
  toEmail: 'StephenspiLLC@gmail.com'
};

// ============================================================================
// OPTION 4: Email via AWS SES
// ============================================================================
// Requires: AWS account and SES setup

const AWS_SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  fromEmail: 'noreply@yourbusiness.com'
};

// ============================================================================
// SMS: OPTION 1 - Twilio (Free Trial Available)
// ============================================================================
// Requires: Free Twilio account

const TWILIO_CONFIG = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || 'AC_your_sid_here',
  authToken: process.env.TWILIO_AUTH_TOKEN || 'your_auth_token_here',
  fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890', // Your Twilio number
  toNumber: '+19199430028' // Destination: 919-943-0028
};

// ============================================================================
// SMS: OPTION 2 - AWS SNS
// ============================================================================
// Requires: AWS account

const AWS_SNS_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  phoneNumber: '+19199430028' // Must be E.164 format
};

// ============================================================================
// SMS: OPTION 3 - Vonage/Nexmo
// ============================================================================
// Requires: Vonage account

const VONAGE_CONFIG = {
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  fromNumber: 'SendGrid', // Can be alphanumeric
  toNumber: '19199430028'
};

// ============================================================================
// IMPLEMENTATION EXAMPLES
// ============================================================================

// EXAMPLE 1: Using Formspree for Email (Easiest)
// ============================================================================
/*
const https = require('https');

async function sendEmailFormspree(lead) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: 'StephenspiLLC@gmail.com',
      message: formatLeadMessage(lead)
    });

    const options = {
      hostname: 'formspree.io',
      port: 443,
      path: `/f/${FORMSPREE_EMAIL_CONFIG.formId}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Email sent via Formspree');
          resolve(true);
        } else {
          console.log('⚠️ Email issue:', res.statusCode);
          resolve(true);
        }
      });
    });

    req.on('error', (e) => {
      console.log('⚠️ Email error:', e.message);
      resolve(true);
    });

    req.write(data);
    req.end();
  });
}
*/

// EXAMPLE 2: Using Twilio for SMS
// ============================================================================
/*
const twilio = require('twilio');
const client = twilio(TWILIO_CONFIG.accountSid, TWILIO_CONFIG.authToken);

async function sendSMSTwilio(lead) {
  try {
    const message = await client.messages.create({
      body: `New Lead: ${lead.name} - ${lead.address}, ${lead.city} | ${lead.phone}`,
      from: TWILIO_CONFIG.fromNumber,
      to: TWILIO_CONFIG.toNumber
    });

    console.log('✅ SMS sent:', message.sid);
    return true;
  } catch (error) {
    console.log('⚠️ SMS error:', error.message);
    return true; // Don't fail the whole request
  }
}
*/

// EXAMPLE 3: Using SendGrid for Email
// ============================================================================
/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_CONFIG.apiKey);

async function sendEmailSendGrid(lead) {
  try {
    const msg = {
      to: SENDGRID_CONFIG.toEmail,
      from: SENDGRID_CONFIG.fromEmail,
      subject: `Property Lead: ${lead.address}, ${lead.city}`,
      html: formatLeadAsHTML(lead)
    };

    await sgMail.send(msg);
    console.log('✅ Email sent via SendGrid');
    return true;
  } catch (error) {
    console.log('⚠️ Email error:', error.message);
    return true;
  }
}
*/

// ============================================================================
// ENVIRONMENT VARIABLES (RECOMMENDED)
// ============================================================================
/*
On Windows Command Prompt:

set FORMSPREE_ID=f/your_form_id
set GMAIL_APP_PASSWORD=your_16_char_password
set SENDGRID_API_KEY=SG.your_key
set TWILIO_ACCOUNT_SID=AC_your_sid
set TWILIO_AUTH_TOKEN=your_token
set TWILIO_FROM_NUMBER=+1234567890

Then run:
node server.js
*/

// ============================================================================
// HOW TO CHOOSE
// ============================================================================
/*
EASIEST EMAIL: Formspree
- No Node.js module needed
- Just HTTP POST
- Free, no credit card
- Perfect for getting started

EASIEST SMS: Twilio
- Simple npm package
- Free trial with credits
- Easy to test
- Good documentation

MOST RELIABLE: SendGrid + Twilio
- Both have free tiers
- Industry standard
- Good for production
- Requires API setup
*/

module.exports = {
  FORMSPREE_EMAIL_CONFIG,
  GMAIL_CONFIG,
  SENDGRID_CONFIG,
  AWS_SES_CONFIG,
  TWILIO_CONFIG,
  AWS_SNS_CONFIG,
  VONAGE_CONFIG
};
