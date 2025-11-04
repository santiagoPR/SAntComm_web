const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Transparent 1x1 pixel GIF
const TRACKING_PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

// Track email open
router.get('/open/:campaignId/:contactId', async (req, res) => {
  try {
    const { campaignId, contactId } = req.params;

    console.log(`📊 Email opened - Campaign: ${campaignId}, Contact: ${contactId}`);

    // Update campaign contact status
    const updated = await prisma.campaignContact.updateMany({
      where: {
        campaignId,
        contactId,
        status: {
          in: ['SENT', 'DELIVERED']
        }
      },
      data: {
        status: 'OPENED',
        openedAt: new Date()
      }
    });

    if (updated.count > 0) {
      // Log activity
      await prisma.campaignActivity.create({
        data: {
          campaignId,
          activityType: 'OPENED',
          description: `Contact opened the email`,
          metadata: JSON.stringify({
            contactId,
            timestamp: new Date().toISOString(),
            userAgent: req.headers['user-agent']
          })
        }
      });

      console.log(`✅ Email open tracked successfully`);
    }

    // Return tracking pixel
    res.set({
      'Content-Type': 'image/gif',
      'Content-Length': TRACKING_PIXEL.length,
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache'
    });
    res.send(TRACKING_PIXEL);

  } catch (error) {
    console.error('Track open error:', error);
    // Still return pixel even on error
    res.set({
      'Content-Type': 'image/gif',
      'Content-Length': TRACKING_PIXEL.length
    });
    res.send(TRACKING_PIXEL);
  }
});

// Track email click
router.get('/click/:campaignId/:contactId', async (req, res) => {
  try {
    const { campaignId, contactId } = req.params;
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('Missing URL parameter');
    }

    const decodedUrl = decodeURIComponent(url);

    console.log(`🔗 Link clicked - Campaign: ${campaignId}, Contact: ${contactId}, URL: ${decodedUrl}`);

    // Update campaign contact status
    await prisma.campaignContact.updateMany({
      where: {
        campaignId,
        contactId,
        status: {
          in: ['SENT', 'DELIVERED', 'OPENED']
        }
      },
      data: {
        status: 'CLICKED',
        clickedAt: new Date()
      }
    });

    // Log activity
    await prisma.campaignActivity.create({
      data: {
        campaignId,
        activityType: 'CLICKED',
        description: `Contact clicked a link`,
        metadata: JSON.stringify({
          contactId,
          url: decodedUrl,
          timestamp: new Date().toISOString(),
          userAgent: req.headers['user-agent'],
          referer: req.headers['referer']
        })
      }
    });

    console.log(`✅ Click tracked successfully`);

    // Redirect to original URL
    res.redirect(decodedUrl);

  } catch (error) {
    console.error('Track click error:', error);
    // Try to redirect anyway
    if (req.query.url) {
      res.redirect(decodeURIComponent(req.query.url));
    } else {
      res.status(500).send('Error tracking click');
    }
  }
});

// Manual conversion tracking endpoint
router.post('/convert/:campaignId/:contactId', async (req, res) => {
  try {
    const { campaignId, contactId } = req.params;
    const { value, notes } = req.body;

    console.log(`💰 Conversion - Campaign: ${campaignId}, Contact: ${contactId}, Value: $${value || 0}`);

    // Update campaign contact status
    await prisma.campaignContact.updateMany({
      where: {
        campaignId,
        contactId
      },
      data: {
        status: 'CONVERTED',
        convertedAt: new Date()
      }
    });

    // Log activity
    await prisma.campaignActivity.create({
      data: {
        campaignId,
        activityType: 'CONVERTED',
        description: notes || 'Contact converted',
        metadata: JSON.stringify({
          contactId,
          value: value || 0,
          timestamp: new Date().toISOString()
        })
      }
    });

    console.log(`✅ Conversion tracked successfully`);

    res.json({ success: true, message: 'Conversion tracked' });

  } catch (error) {
    console.error('Track conversion error:', error);
    res.status(500).json({ error: 'Failed to track conversion' });
  }
});

// Get tracking stats for a campaign
router.get('/stats/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;

    const stats = await prisma.campaignContact.groupBy({
      by: ['status'],
      where: {
        campaignId
      },
      _count: {
        status: true
      }
    });

    const activities = await prisma.campaignActivity.findMany({
      where: {
        campaignId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    res.json({
      stats,
      activities
    });

  } catch (error) {
    console.error('Get tracking stats error:', error);
    res.status(500).json({ error: 'Failed to get tracking stats' });
  }
});

module.exports = router;
