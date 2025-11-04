const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

// Encryption key - in production, use a proper key management service
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key!!';
const ALGORITHM = 'aes-256-cbc';

// Simple encryption function
const encrypt = (text) => {
  if (!text) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32)), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Simple decryption function
const decrypt = (text) => {
  if (!text) return null;
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32)), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Get user's integration settings
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    let settings = await prisma.integrationSettings.findUnique({
      where: { userId }
    });

    // If no settings exist, create default empty settings
    if (!settings) {
      settings = await prisma.integrationSettings.create({
        data: { userId }
      });
    }

    // Decrypt sensitive fields for display (masked)
    const response = {
      ...settings,
      sendgridApiKey: settings.sendgridApiKey ? '••••••••••••' : null,
      smtpPass: settings.smtpPass ? '••••••••••••' : null,
      facebookAccessToken: settings.facebookAccessToken ? '••••••••••••' : null,
      linkedinAccessToken: settings.linkedinAccessToken ? '••••••••••••' : null,
      twitterApiKey: settings.twitterApiKey ? '••••••••••••' : null,
      twitterApiSecret: settings.twitterApiSecret ? '••••••••••••' : null,
      twitterAccessToken: settings.twitterAccessToken ? '••••••••••••' : null,
      twitterAccessSecret: settings.twitterAccessSecret ? '••••••••••••' : null
    };

    res.json(response);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// Update integration settings
router.put('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      emailProvider,
      sendgridApiKey,
      sendgridFromEmail,
      sendgridFromName,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      facebookPageId,
      facebookAccessToken,
      linkedinAccessToken,
      linkedinOrgId,
      twitterApiKey,
      twitterApiSecret,
      twitterAccessToken,
      twitterAccessSecret,
      webhookBaseUrl
    } = req.body;

    // Prepare update data with encryption for sensitive fields
    const updateData = {
      emailProvider,
      sendgridFromEmail,
      sendgridFromName,
      smtpHost,
      smtpPort: smtpPort ? parseInt(smtpPort) : null,
      smtpUser,
      facebookPageId,
      linkedinOrgId,
      webhookBaseUrl
    };

    // Only encrypt and update if new values are provided (not masked)
    if (sendgridApiKey && !sendgridApiKey.includes('•')) {
      updateData.sendgridApiKey = encrypt(sendgridApiKey);
    }
    if (smtpPass && !smtpPass.includes('•')) {
      updateData.smtpPass = encrypt(smtpPass);
    }
    if (facebookAccessToken && !facebookAccessToken.includes('•')) {
      updateData.facebookAccessToken = encrypt(facebookAccessToken);
    }
    if (linkedinAccessToken && !linkedinAccessToken.includes('•')) {
      updateData.linkedinAccessToken = encrypt(linkedinAccessToken);
    }
    if (twitterApiKey && !twitterApiKey.includes('•')) {
      updateData.twitterApiKey = encrypt(twitterApiKey);
    }
    if (twitterApiSecret && !twitterApiSecret.includes('•')) {
      updateData.twitterApiSecret = encrypt(twitterApiSecret);
    }
    if (twitterAccessToken && !twitterAccessToken.includes('•')) {
      updateData.twitterAccessToken = encrypt(twitterAccessToken);
    }
    if (twitterAccessSecret && !twitterAccessSecret.includes('•')) {
      updateData.twitterAccessSecret = encrypt(twitterAccessSecret);
    }

    const settings = await prisma.integrationSettings.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...updateData
      }
    });

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Test email connection
router.post('/test-email', async (req, res) => {
  try {
    const userId = req.user.id;
    const { provider, testEmail } = req.body;

    const settings = await prisma.integrationSettings.findUnique({
      where: { userId }
    });

    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    // Test based on provider
    if (provider === 'SENDGRID') {
      if (!settings.sendgridApiKey) {
        return res.status(400).json({ error: 'SendGrid API key not configured' });
      }

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(decrypt(settings.sendgridApiKey));

      await sgMail.send({
        to: testEmail || req.user.email,
        from: settings.sendgridFromEmail,
        subject: 'SAntComm CRM - Email Test',
        text: 'This is a test email from SAntComm CRM. Your SendGrid integration is working!'
      });

      res.json({ success: true, message: 'Test email sent successfully via SendGrid' });
    } else if (provider === 'SMTP') {
      if (!settings.smtpUser || !settings.smtpPass) {
        return res.status(400).json({ error: 'SMTP credentials not configured' });
      }

      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransporter({
        host: settings.smtpHost,
        port: settings.smtpPort,
        secure: false,
        auth: {
          user: settings.smtpUser,
          pass: decrypt(settings.smtpPass)
        }
      });

      await transporter.sendMail({
        from: `"${settings.sendgridFromName || 'SAntComm'}" <${settings.smtpUser}>`,
        to: testEmail || req.user.email,
        subject: 'SAntComm CRM - Email Test',
        text: 'This is a test email from SAntComm CRM. Your SMTP integration is working!'
      });

      res.json({ success: true, message: 'Test email sent successfully via SMTP' });
    } else {
      res.status(400).json({ error: 'Invalid provider' });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message || 'Failed to send test email' });
  }
});

// Get decrypted settings for internal use (used by services)
router.get('/internal', async (req, res) => {
  try {
    const userId = req.headers['user-id'] || req.user?.id;

    if (!userId) {
      return res.json(null);
    }

    const settings = await prisma.integrationSettings.findUnique({
      where: { userId }
    });

    if (!settings) {
      return res.json(null);
    }

    // Decrypt all sensitive fields
    const decryptedSettings = {
      ...settings,
      sendgridApiKey: settings.sendgridApiKey ? decrypt(settings.sendgridApiKey) : null,
      smtpPass: settings.smtpPass ? decrypt(settings.smtpPass) : null,
      facebookAccessToken: settings.facebookAccessToken ? decrypt(settings.facebookAccessToken) : null,
      linkedinAccessToken: settings.linkedinAccessToken ? decrypt(settings.linkedinAccessToken) : null,
      twitterApiKey: settings.twitterApiKey ? decrypt(settings.twitterApiKey) : null,
      twitterApiSecret: settings.twitterApiSecret ? decrypt(settings.twitterApiSecret) : null,
      twitterAccessToken: settings.twitterAccessToken ? decrypt(settings.twitterAccessToken) : null,
      twitterAccessSecret: settings.twitterAccessSecret ? decrypt(settings.twitterAccessSecret) : null
    };

    res.json(decryptedSettings);
  } catch (error) {
    console.error('Get internal settings error:', error);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

module.exports = router;
