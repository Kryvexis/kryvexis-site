# Kryvexis site update

This package includes:
- mobile/menu/FAQ fixes
- cookie banner with Accept, Decline, and Manage preferences
- Privacy Policy and Terms & Conditions pages
- required POPIA-style consent checkbox on the contact form
- footer legal links
- Resend-based email delivery in `server.js`

## Before you run
1. Install dependencies:
   npm install
2. Make sure your `.env` includes:
   - RESEND_API_KEY
   - CONTACT_TO_EMAIL
   - CONTACT_FROM_EMAIL
3. Start locally:
   npm start

## Deploy
Push the updated files to GitHub and let Render redeploy.

## Notes
- Cookie preferences are stored locally in the browser.
- PAIA manual link is left as a request-by-email link so you do not publish an inaccurate manual.
- If you want spreadsheet capture next, connect Google Sheets after this update is live.
