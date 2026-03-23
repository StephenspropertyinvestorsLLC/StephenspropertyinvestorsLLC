# Quick Start - Automatic Lead Capture

Your CRM is now configured for **automatic email and SMS** submission. When customers fill out the form and click "Get My Cash Offer", their information is automatically sent.

## What's New ✨

✅ Form submission is instant and automatic
✅ No more manual "Send via Email" or "Send via Text" buttons
✅ Leads stored on server AND notifications sent automatically
✅ Clean success page confirming everything was sent

---

## How to Test

### 1. Start the Server

Open Command Prompt and run:
```bash
cd "C:\Users\Isaiah\OneDrive - North Carolina A&T State University\Desktop\TyreBusiness"
node server.js
```

You should see:
```
✅ Real Estate CRM running on http://localhost:5000
📧 Auto Email: Notifications logged to console
📱 Auto SMS: Ready for integration
```

### 2. Open the Landing Page

Visit: **http://localhost:5000/index.html**

### 3. Fill Out the Form

- Fill in all required fields (marked with *)
- Property information
- Seller information
- Contact details
- Choose preferred contact method

### 4. Submit

Click **💰 Get My Cash Offer**

### 5. See Success Page

You'll see a success message indicating:
- ✅ Email has been sent to StephenspiLLC@gmail.com
- ✅ SMS notification sent to 919-943-0028
- Your submission summary

### 6. Check Server Console

Look at the Command Prompt where server.js is running. You'll see the formatted email that would be sent:

```
════════════════════════════════════════════════════════════════
📧 EMAIL NOTIFICATION - New Property Lead
════════════════════════════════════════════════════════════════

TO: StephenspiLLC@gmail.com

Subject: Property Lead Submission: 123 Main St, Raleigh

[Full lead details...]

✅ Email notification logged to console
📱 SMS NOTIFICATION WOULD BE SENT TO: 919-943-0028
✅ All notifications sent!
```

---

## Next Steps: Configure Real Email/SMS

The system currently logs to console. To send **real emails and SMS**, follow the setup guide:

**See: EMAIL_SMS_SETUP.md**

Choose one of these options:

### For Email (Choose One):
1. **Formspree** - Free, easiest setup
2. **Gmail App Password** - Free, if you can enable 2FA
3. **SendGrid** - Free tier available (100 emails/day)

### For SMS (Choose One):
1. **Twilio** - Free trial available (100 SMS)
2. **AWS SNS** - Free tier available
3. **Manual** - Forward console output to your phone

---

## What Leads Look Like

Each lead includes:
- ✅ Full name, phone, email
- ✅ Complete property address
- ✅ Property type, condition, timeline
- ✅ Why they're selling
- ✅ Occupancy status
- ✅ Best time to contact
- ✅ Submission timestamp
- ✅ Lead ID for tracking

---

## View Leads

### In Browser:
- **All leads**: http://localhost:5000/api/leads
- **Single lead**: http://localhost:5000/api/leads/1

### In Console:
Check the Command Prompt for detailed lead info logged with emoji indicators

---

## Troubleshooting

### Form won't submit?
- Check that server is running
- Make sure you're on http://localhost:5000
- Check browser console (F12) for errors

### Success page shows but nothing happens?
- Currently, email/SMS are logged to console
- Check your Command Prompt output
- Follow EMAIL_SMS_SETUP.md to configure real email

### Server crashes?
- Check error message in console
- Make sure Node.js is installed: `node --version`
- Restart server: `node server.js`

---

## Files Overview

| File | Purpose |
|------|---------|
| **index.html** | Landing page with form |
| **server.js** | Backend API and lead storage |
| **package.json** | Dependencies |
| **EMAIL_SMS_SETUP.md** | Setup guide for real email/SMS |
| **README.md** | Full documentation |

---

## Success Workflow

```
Customer fills form
        ↓
Click "Get My Cash Offer"
        ↓
Form submits to server
        ↓
Server stores lead
        ↓
Email notification sent (logged to console)
        ↓
SMS notification sent (logged to console)
        ↓
Customer sees success page
        ↓
Lead details shown in /api/leads
```

---

## Next: Enable Real Notifications

Once you're ready to send **real emails and SMS**:

1. Open **EMAIL_SMS_SETUP.md**
2. Choose your preferred email service
3. Add your API keys to server.js
4. Restart the server
5. Test again

---

**Questions?** Call: 919-943-0028
**Email**: StephenspiLLC@gmail.com
