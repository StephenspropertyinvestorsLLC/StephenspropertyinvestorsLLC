# Setup Email & SMS - 10 Minute Setup

Your CRM is configured to send real emails and SMS. Follow these quick steps.

---

## 📧 Step 1: Email via Formspree (3 minutes)

### Create Formspree Form:

1. Visit: https://formspree.io
2. Click **"Create Form"** (top right)
3. Set **Email recipient**: `StephenspiLLC@gmail.com`
4. Click **"Create"** - you'll get a form ID like: `f/xojvenwp`
5. **Copy your form ID**

### Add to your server:

Open `server.js` and find line 12:
```javascript
const FORMSPREE_FORM_ID = process.env.FORMSPREE_ID || 'xojvenwp';
```

Replace `xojvenwp` with your form ID. Example:
```javascript
const FORMSPREE_FORM_ID = process.env.FORMSPREE_ID || 'f/abc123def456';
```

**Done!** Emails will now be sent to StephenspiLLC@gmail.com

---

## 📱 Step 2: SMS via Twilio (5 minutes)

### Get Twilio Account:

1. Visit: https://www.twilio.com/try-twilio
2. Sign up (free trial, $15 credit)
3. Verify your phone number
4. Get your **Account SID** and **Auth Token** from the dashboard
5. Get a **phone number** (Twilio assigns one - copy it)

### Install Twilio:

Open Command Prompt in your project folder and run:
```bash
npm install twilio
```

### Add Credentials to server.js:

Find lines 13-15 in `server.js`:
```javascript
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || '';
```

Add your Twilio credentials (from your Twilio dashboard):
```javascript
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token_here';
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || '+1234567890'; // Your Twilio phone number
```

**Done!** SMS will now be sent to 919-943-0028

---

## 🚀 Test It

1. **Restart your server**:
   ```bash
   node server.js
   ```

2. **Visit your form**:
   ```
   http://localhost:5000/index.html
   ```

3. **Fill out and submit**

4. **Check results**:
   - ✅ Email arrives at StephenspiLLC@gmail.com
   - ✅ SMS arrives at 919-943-0028
   - ✅ Server console shows success messages

---

## If Something Doesn't Work

### Email not sending?
- Check server console for error message
- Make sure your Formspree form ID is correct
- Verify Formspree account is active
- Check spam folder

### SMS not sending?
- Verify Twilio credentials are correct (copy-paste from dashboard)
- Make sure `npm install twilio` was run
- Check server console for errors
- Verify Twilio account has credits (free trial gets $15)

### Can't find Formspree ID?
- Log into formspree.io
- Click on your form
- Copy the ID from the URL: `formspree.io/f/YOUR_ID_HERE`

### Can't find Twilio credentials?
- Log into twilio.com
- Go to Account → API Keys & Tokens
- Copy Account SID and Auth Token
- Get phone number from: Phone Numbers → Manage Numbers

---

## Environment Variables (Secure Way)

Instead of putting credentials in code, use environment variables:

**Windows Command Prompt**:
```bash
set FORMSPREE_ID=f/your_form_id
set TWILIO_ACCOUNT_SID=ACxxxxxxxx
set TWILIO_AUTH_TOKEN=your_token
set TWILIO_FROM_NUMBER=+1234567890

node server.js
```

Server.js will automatically read these values.

---

## What Happens Now

**Customer fills form → Clicks "Get My Cash Offer"**
```
✓ Form data stored on server
✓ Email sent to StephenspiLLC@gmail.com (via Formspree)
✓ SMS sent to 919-943-0028 (via Twilio)
✓ Success page shown to customer
```

---

## Pricing

- **Formspree**: FREE
- **Twilio**: FREE trial ($15 credit, then ~$0.01 per SMS after)

---

## Questions?

Check server console output for error messages. Contact: 919-943-0028
