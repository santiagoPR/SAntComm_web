const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Get user settings from database
const getUserSettings = async (userId) => {
  try {
    // Call the internal settings endpoint
    const response = await axios.get(`http://localhost:${process.env.PORT || 5000}/api/settings/internal`, {
      headers: {
        'user-id': userId // Pass user ID in header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user settings:', error.message);
    return null;
  }
};

// Initialize SendGrid with user settings
const initSendGrid = (settings) => {
  if (settings?.sendgridApiKey) {
    sgMail.setApiKey(settings.sendgridApiKey);
    return true;
  }
  // Fallback to environment variables
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'your-sendgrid-api-key-here') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return true;
  }
  return false;
};

// Initialize Nodemailer with user settings
const createSMTPTransporter = (settings) => {
  if (settings?.smtpUser && settings?.smtpPass) {
    return nodemailer.createTransporter({
      host: settings.smtpHost || 'smtp.gmail.com',
      port: settings.smtpPort || 587,
      secure: false,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPass
      }
    });
  }
  // Fallback to environment variables
  if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your-email@gmail.com') {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Generate tracking pixel HTML
const generateTrackingPixel = (campaignId, contactId, settings = null) => {
  const baseUrl = settings?.webhookBaseUrl || process.env.WEBHOOK_BASE_URL || 'http://localhost:5000';
  return `<img src="${baseUrl}/api/track/open/${campaignId}/${contactId}" width="1" height="1" alt="" />`;
};

// Generate click tracking link
const generateClickTrackingLink = (campaignId, contactId, originalUrl, settings = null) => {
  const baseUrl = settings?.webhookBaseUrl || process.env.WEBHOOK_BASE_URL || 'http://localhost:5000';
  const encodedUrl = encodeURIComponent(originalUrl);
  return `${baseUrl}/api/track/click/${campaignId}/${contactId}?url=${encodedUrl}`;
};

// Replace links in HTML content with tracking links
const replaceLinksWithTracking = (html, campaignId, contactId, settings = null) => {
  // Match all <a href="..."> tags
  return html.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi, (match, url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const trackingUrl = generateClickTrackingLink(campaignId, contactId, url, settings);
      return match.replace(url, trackingUrl);
    }
    return match;
  });
};

// Send email using SendGrid
const sendWithSendGrid = async (to, subject, html, campaignId, contactId, settings) => {
  const trackingPixel = generateTrackingPixel(campaignId, contactId, settings);
  const htmlWithTracking = replaceLinksWithTracking(html, campaignId, contactId, settings) + trackingPixel;

  const msg = {
    to,
    from: {
      email: settings?.sendgridFromEmail || process.env.SENDGRID_FROM_EMAIL || 'noreply@santcom.com',
      name: settings?.sendgridFromName || process.env.SENDGRID_FROM_NAME || 'SAntComm'
    },
    subject,
    html: htmlWithTracking,
    trackingSettings: {
      clickTracking: { enable: false }, // We use our own tracking
      openTracking: { enable: false }   // We use our own tracking
    }
  };

  return await sgMail.send(msg);
};

// Send email using SMTP (Nodemailer)
const sendWithSMTP = async (to, subject, html, campaignId, contactId, settings) => {
  const transporter = createSMTPTransporter(settings);
  if (!transporter) {
    throw new Error('SMTP not configured');
  }

  const trackingPixel = generateTrackingPixel(campaignId, contactId, settings);
  const htmlWithTracking = replaceLinksWithTracking(html, campaignId, contactId, settings) + trackingPixel;

  const mailOptions = {
    from: `"${settings?.sendgridFromName || process.env.SENDGRID_FROM_NAME || 'SAntComm'}" <${settings?.smtpUser || process.env.SMTP_USER}>`,
    to,
    subject,
    html: htmlWithTracking
  };

  return await transporter.sendMail(mailOptions);
};

// Main send email function
const sendEmail = async (to, subject, html, campaignId, contactId, userId = null) => {
  try {
    // Get user settings if userId provided
    let settings = null;
    if (userId) {
      settings = await getUserSettings(userId);
    }

    // Try SendGrid first (from settings or environment)
    if (initSendGrid(settings)) {
      console.log(`Sending email via SendGrid to ${to}`);
      await sendWithSendGrid(to, subject, html, campaignId, contactId, settings);
      return { success: true, provider: 'sendgrid' };
    }

    // Fall back to SMTP (from settings or environment)
    const transporter = createSMTPTransporter(settings);
    if (transporter) {
      console.log(`Sending email via SMTP to ${to}`);
      await sendWithSMTP(to, subject, html, campaignId, contactId, settings);
      return { success: true, provider: 'smtp' };
    }

    // No email service configured - development mode
    console.log(`📧 EMAIL (DEV MODE) to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Campaign: ${campaignId}, Contact: ${contactId}`);
    console.log('---');
    return { success: true, provider: 'development', devMode: true };

  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

// Send bulk emails for a campaign
const sendCampaignEmails = async (campaign, contacts) => {
  const results = {
    sent: 0,
    failed: 0,
    errors: []
  };

  for (const contact of contacts) {
    try {
      if (!contact.email) {
        console.log(`Skipping contact ${contact.id} - no email address`);
        continue;
      }

      // Personalize email content
      let personalizedContent = campaign.emailContent || '';
      personalizedContent = personalizedContent.replace(/{{firstName}}/g, contact.firstName || '');
      personalizedContent = personalizedContent.replace(/{{lastName}}/g, contact.lastName || '');
      personalizedContent = personalizedContent.replace(/{{email}}/g, contact.email || '');

      await sendEmail(
        contact.email,
        campaign.emailSubject || 'Message from SAntComm',
        personalizedContent,
        campaign.id,
        contact.id,
        campaign.ownerId
      );

      results.sent++;

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`Failed to send to ${contact.email}:`, error.message);
      results.failed++;
      results.errors.push({
        contactId: contact.id,
        email: contact.email,
        error: error.message
      });
    }
  }

  return results;
};

module.exports = {
  sendEmail,
  sendCampaignEmails,
  generateTrackingPixel,
  generateClickTrackingLink
};
