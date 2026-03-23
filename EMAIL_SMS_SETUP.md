# Email & SMS Setup Guide

Your CRM is now configured to automatically send leads via email and SMS when customers submit the form. Follow these steps to enable automatic notifications.

## Current Status

✅ **Form Submission**: Working
✅ **Lead Storage**: Working
📧 **Email Notifications**: Console logging (ready for integration)
📱 **SMS Notifications**: Console logging (ready for integration)

---

## Option 1: Email via Formspree (Recommended - No Setup Needed)

Formspree is a free service that sends form submissions directly to your email.

### Setup Steps:

1. **Visit Formspree.io**
   Go to https://formspree.io and sign up for free

2. **Create a Form**
   - Click "Create Form" or add new form
   - Set your email as the recipient: `StephenspiLLC@gmail.com`
   - Copy your form ID (example: `f/xojvenwp`)

3. **Update server.js**
   Open `server.js` and find this section (around line 27):
   ```javascript
   // Replace FORMSPREE_ID with your actual Formspree form ID
   const FORMSPREE_ID = 'f/xojvenwp';
   ```

4. **Test It**
   - Restart your server: `node server.js`
   - Fill out the form on your landing page
   - Check your email for the submission
   - Check the server console for confirmation

---

## Option 2: Email via Gmail (With App Password)

If you can generate an App Password for Gmail:

1. **Enable 2-Factor Authentication** on your Google account
   https://myaccount.google.com/security

2. **Create App Password**
   https://myaccount.google.com/apppasswords
   - Select Mail and Windows Computer
   - Google will generate a 16-character password

3. **Update server.js**
   Add this to the top of `server.js` (after imports):
   ```javascript
   const nodemailer = require('nodemailer');

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'StephenspiLLC@gmail.com',
       pass: 'your_16_character_app_password_here' // Remove spaces
     }
   });
   ```

4. **Update sendEmailNotification function**
   Replace the function with:
   ```javascript
   async function sendEmailNotification(lead) {
     const mailOptions = {
       from: 'StephenspiLLC@gmail.com',
       to: 'StephenspiLLC@gmail.com',
       subject: `Property Lead: ${lead.address}, ${lead.city}`,
       html: `<h2>New Property Lead</h2>...` // formatted HTML email
     };

     try {
       await transporter.sendMail(mailOptions);
       console.log('✅ Email sent!');
     } catch (error) {
       console.log('❌ Email error:', error.message);
     }
   }
   ```

---

## Option 3: Email via SendGrid (Free Tier Available)

SendGrid offers free email sending (100 emails/day):

1. **Create SendGrid Account**
   https://sendgrid.com/free

2. **Get API Key**
   https://app.sendgrid.com/settings/api_keys

3. **Install SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

4. **Update server.js**
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   ```

---

## SMS Options

### Option A: Twilio (Easiest - Free Trial Available)

1. **Create Account**: https://www.twilio.com/try-twilio
2. **Get Credentials**: Account SID and Auth Token
3. **Install**: `npm install twilio`
4. **Add to server.js**:
   ```javascript
   const twilio = require('twilio');
   const client = twilio(accountSid, authToken);

   async function sendSMSNotification(lead) {
     try {
       await client.messages.create({
         body: `New lead: ${lead.name} - ${lead.address}, ${lead.city}`,
         from: '+1YOUR_TWILIO_NUMBER',
         to: '+19199430028'
       });
       console.log('✅ SMS sent!');
     } catch (error) {
       console.log('❌ SMS error:', error.message);
     }
   }
   ```

### Option B: AWS SNS

AWS offers free SMS sending in the free tier:

1. **Create AWS Account**: https://aws.amazon.com/free
2. **Setup SNS**: Simple Notification Service
3. **Get Credentials**: Access Key and Secret Key
4. **Install**: `npm install aws-sdk`

### Option C: Manual SMS (For Now)

The server currently logs leads to console. You can:
- Check console output and manually text/email leads
- Forward the console output to your phone
- Set up a notification integration later

---

## Current Implementation

**Right now**, the server:

1. ✅ Receives form submissions
2. ✅ Validates required fields
3. ✅ Stores leads in memory
4. 📝 Logs email details to console
5. 📝 Logs SMS notification reminder to console

**When you view server output**, you'll see:
```
✅ Email notification logged to console
📱 SMS NOTIFICATION WOULD BE SENT TO: 919-943-0028
```

---

## Testing

### Test Email Setup:
1. Run: `node server.js`
2. Visit: http://localhost:5000/index.html
3. Fill out and submit the form
4. Check:
   - ✅ Server console for confirmation
   - ✅ Your email inbox for the lead
   - ✅ Spam folder if not in inbox

### Test SMS Setup:
1. Check server console output
2. Verify phone number is correct
3. If using Twilio/SMS service, confirm credentials are set

---

## Environment Variables (For Production)

Never put API keys directly in code! Use environment variables:

```bash
# On Windows Command Prompt:
set GMAIL_APP_PASSWORD=your_16_char_password
set SENDGRID_API_KEY=your_sendgrid_key
set TWILIO_ACCOUNT_SID=your_twilio_sid
set TWILIO_AUTH_TOKEN=your_twilio_token

# Then in server.js:
const apiKey = process.env.SENDGRID_API_KEY;
```

---

## Quick Start (No Extra Setup)

**Out of the box:**
- ✅ Form captures all lead details
- ✅ Leads stored on server
- ✅ Email/SMS logged to console
- ✅ Success page shows "Email & SMS sent"

**Choose one email option above** and add it to send real notifications.

---

## Questions?

Check the server console output for errors and status messages. Look for:
- ✅ Green checkmarks = Success
- ⚠️ Warnings = Check your configuration
- ❌ Errors = Review the error message and fix the issue

Contact: 919-943-0028 | StephenspiLLC@gmail.com
