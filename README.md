# Stephenspi LLC - Professional CRM System 🛞

A modern, beautiful lead management system for your tire business with automated email notifications.

## Features ✨

- 🎨 **Modern, Responsive Design** - Beautiful landing page that converts visitors into leads
- 📧 **Automated Email Notifications** - Instantly receive lead details at StephenspiLLC@gmail.com
- 📱 **Contact Preference System** - Leads choose their preferred contact method (Email or Phone)
- 📋 **FAQ Section** - Address common customer questions
- 🏆 **Service Categories** - Track interest in specific tire services
- 📊 **Lead Analytics** - View statistics on leads and preferences
- ⚡ **Fast & Lightweight** - Built with Node.js and Express

## Quick Start 🚀

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `body-parser` - Parse form data
- `cors` - Cross-origin requests
- `nodemailer` - Email notifications

### 2. Configure Gmail Email Notifications

To receive lead notifications at **StephenspiLLC@gmail.com**:

#### Step A: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com
2. Select "Security" from the left menu
3. Under "How you sign in to Google", enable "2-Step Verification"

#### Step B: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password (example: `abcd efgh ijkl mnop`)
4. **Copy this password** (remove spaces)

#### Step C: Update server.js
Open `server.js` and replace:
```javascript
pass: 'your_gmail_app_password_here'
```

With your actual app password:
```javascript
pass: 'abcdefghijklmnop'  // Replace with your 16-character password
```

### 3. Run the Server

```bash
node server.js
```

You should see:
```
✅ CRM Server running on http://localhost:3000
✅ Email service configured successfully!
```

### 4. Open Your Landing Page

Visit: **http://localhost:3000/index.html**

## How It Works 🔄

### For Visitors:
1. Customer visits your landing page
2. Fills out the lead form with their details
3. Selects preferred contact method (Email or Phone)
4. Submits the form
5. Gets confirmation message

### For You:
1. Instant email notification at StephenspiLLC@gmail.com
2. Email contains all lead details in a formatted HTML email
3. Click reply to contact them directly
4. View all leads in the API

## API Endpoints 📡

### View All Leads
```
GET http://localhost:3000/api/leads
```
Returns all captured leads with total count

### View Single Lead
```
GET http://localhost:3000/api/leads/:id
```
Example: `http://localhost:3000/api/leads/1`

### View Statistics
```
GET http://localhost:3000/api/stats
```
Returns:
- Total leads count
- Contact preference breakdown (Email vs Phone)
- Service interest breakdown

### Submit a Lead (done automatically by form)
```
POST http://localhost:3000/api/leads
```

## Landing Page Features 🎯

### Hero Section
- Eye-catching gradient background
- Clear value proposition
- Call-to-action button

### Lead Capture Form
- Full Name
- Email Address
- Phone Number
- Service Interest (dropdown)
- Contact Preference (Email or Phone)
- Additional Details (optional)

### Features Section
- Fast Service
- Quality Guaranteed
- Best Prices
- Expert Team

### FAQ Section
- 5 Pre-built questions
- Expandable/collapsible answers
- Professional styling

### Contact Information
- Email: StephenspiLLC@gmail.com
- Phone: 919-943-0028

## Customization 🎨

### Change Business Colors
Edit the CSS in `index.html`:
```css
/* Current: Purple & Gold theme */
--primary: #667eea;
--accent: #ffd700;
```

### Add More FAQ Questions
Add new items in the FAQ section:
```html
<div class="faq-item">
    <div class="faq-question" onclick="toggleFAQ(this)">
        <span>Your question here?</span>
        <span class="faq-toggle">▼</span>
    </div>
    <div class="faq-answer">
        Your answer here.
    </div>
</div>
```

### Modify Service Categories
Edit the service dropdown in the form:
```html
<option value="your-service">Your Service Name</option>
```

## Troubleshooting 🔧

### "Email service not configured properly"
- Check your Gmail app password is correct
- Make sure 2FA is enabled on your Gmail account
- Verify you're using the 16-character app password, not your regular password

### Form not submitting
- Check that the server is running
- Make sure `http://localhost:3000` is accessible
- Check browser console for errors (F12 → Console)

### Emails not sending
- Restart the server
- Verify the Gmail app password in `server.js`
- Check your Gmail spam folder
- Review the server console for error messages

## Optional: Add SMS Notifications

To send SMS to phone preferences, add Twilio:

```bash
npm install twilio
```

Then update the `sendSMSNotification` function in `server.js` with your Twilio credentials.

## File Structure

```
TyreBusiness/
├── index.html          # Landing page with form and FAQ
├── server.js           # Express backend with email notifications
├── package.json        # Dependencies
└── README.md          # This file
```

## Deploy Your CRM 🌐

### Free Options:
1. **Replit** - Drag and drop, instant hosting
2. **Heroku** - Free tier available
3. **Vercel** - For frontend, keep backend elsewhere
4. **Railway** - Simple deployment

### Paid Options:
1. **AWS** - Reliable, scalable
2. **DigitalOcean** - Affordable VPS
3. **Netlify** - Great for frontend

### Important for Deployment:
- Use environment variables for your Gmail app password
- Update `http://localhost:3000` in `index.html` to your actual domain
- Use HTTPS in production

## Tips for Success 💡

1. **Test First** - Submit test leads before going live
2. **Monitor Inbox** - Check for confirmation that emails are sending
3. **Follow Up Quickly** - Respond to leads within 24 hours
4. **Update Services** - Keep your service list current
5. **FAQ Updates** - Add new questions based on customer inquiries
6. **Track Metrics** - Use the `/api/stats` endpoint to monitor performance

## Support

For issues or questions:
- Check this README
- Review server console output
- Check browser console (F12)
- Verify Gmail app password configuration

---

**Made with ❤️ for Stephenspi LLC**
Contact: 919-943-0028 | StephenspiLLC@gmail.com
