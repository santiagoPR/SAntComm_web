const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all campaigns for the logged-in user
router.get('/', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        ownerId: req.userId
      },
      include: {
        _count: {
          select: {
            campaignContacts: true,
            metrics: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// GET single campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      include: {
        campaignContacts: {
          include: {
            contact: true
          }
        },
        metrics: {
          orderBy: {
            metricDate: 'desc'
          },
          take: 1
        },
        activities: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 20
        },
        _count: {
          select: {
            campaignContacts: true
          }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// CREATE new campaign
router.post('/', async (req, res) => {
  try {
    const {
      name,
      type,
      status,
      description,
      startDate,
      endDate,
      budget,
      targetAudience,
      emailSubject,
      emailContent,
      socialPlatform,
      socialContent,
      contactIds
    } = req.body;

    const campaign = await prisma.campaign.create({
      data: {
        name,
        type,
        status: status || 'DRAFT',
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        budget: budget ? parseFloat(budget) : null,
        targetAudience,
        emailSubject,
        emailContent,
        socialPlatform,
        socialContent,
        ownerId: req.userId,
        campaignContacts: contactIds && contactIds.length > 0 ? {
          create: contactIds.map(contactId => ({
            contactId,
            status: 'PENDING'
          }))
        } : undefined
      },
      include: {
        _count: {
          select: {
            campaignContacts: true
          }
        }
      }
    });

    // Create initial metrics record
    await prisma.campaignMetric.create({
      data: {
        campaignId: campaign.id
      }
    });

    res.status(201).json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// UPDATE campaign
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      type,
      status,
      description,
      startDate,
      endDate,
      budget,
      targetAudience,
      emailSubject,
      emailContent,
      socialPlatform,
      socialContent
    } = req.body;

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const updated = await prisma.campaign.update({
      where: { id: req.params.id },
      data: {
        name,
        type,
        status,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        budget: budget ? parseFloat(budget) : null,
        targetAudience,
        emailSubject,
        emailContent,
        socialPlatform,
        socialContent
      },
      include: {
        _count: {
          select: {
            campaignContacts: true
          }
        }
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// DELETE campaign
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    await prisma.campaign.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

// ADD contacts to campaign
router.post('/:id/contacts', async (req, res) => {
  try {
    const { contactIds } = req.body;

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Create campaign contacts
    const campaignContacts = await prisma.campaignContact.createMany({
      data: contactIds.map(contactId => ({
        campaignId: req.params.id,
        contactId,
        status: 'PENDING'
      })),
      skipDuplicates: true
    });

    res.json({ message: `${campaignContacts.count} contacts added to campaign` });
  } catch (error) {
    console.error('Add campaign contacts error:', error);
    res.status(500).json({ error: 'Failed to add contacts to campaign' });
  }
});

// REMOVE contact from campaign
router.delete('/:id/contacts/:contactId', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    await prisma.campaignContact.deleteMany({
      where: {
        campaignId: req.params.id,
        contactId: req.params.contactId
      }
    });

    res.json({ message: 'Contact removed from campaign' });
  } catch (error) {
    console.error('Remove campaign contact error:', error);
    res.status(500).json({ error: 'Failed to remove contact from campaign' });
  }
});

// GET campaign contacts
router.get('/:id/contacts', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const campaignContacts = await prisma.campaignContact.findMany({
      where: {
        campaignId: req.params.id
      },
      include: {
        contact: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(campaignContacts);
  } catch (error) {
    console.error('Get campaign contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign contacts' });
  }
});

// UPDATE campaign contact status
router.patch('/:id/contacts/:contactId', async (req, res) => {
  try {
    const { status } = req.body;

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const updateData = { status };

    // Set timestamps based on status
    if (status === 'SENT' && !req.body.sentAt) {
      updateData.sentAt = new Date();
    }
    if (status === 'OPENED' && !req.body.openedAt) {
      updateData.openedAt = new Date();
    }
    if (status === 'CLICKED' && !req.body.clickedAt) {
      updateData.clickedAt = new Date();
    }
    if (status === 'CONVERTED' && !req.body.convertedAt) {
      updateData.convertedAt = new Date();
    }

    const updated = await prisma.campaignContact.updateMany({
      where: {
        campaignId: req.params.id,
        contactId: req.params.contactId
      },
      data: updateData
    });

    res.json({ message: 'Campaign contact status updated' });
  } catch (error) {
    console.error('Update campaign contact error:', error);
    res.status(500).json({ error: 'Failed to update campaign contact' });
  }
});

// POST /api/campaigns/:id/execute - Execute/Launch a campaign
router.post('/:id/execute', async (req, res) => {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      include: {
        campaignContacts: {
          include: {
            contact: true
          },
          where: {
            status: 'PENDING'
          }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status === 'ACTIVE') {
      return res.status(400).json({ error: 'Campaign is already active' });
    }

    if (campaign.campaignContacts.length === 0) {
      return res.status(400).json({ error: 'No contacts to send to. Please add contacts first.' });
    }

    // Update campaign status to ACTIVE
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        status: 'ACTIVE',
        startDate: new Date()
      }
    });

    // Execute based on campaign type
    if (campaign.type === 'EMAIL') {
      const { sendCampaignEmails } = require('../services/emailService');

      // Get contacts from campaign
      const contacts = campaign.campaignContacts.map(cc => cc.contact);

      // Send emails in the background
      setImmediate(async () => {
        try {
          console.log(`🚀 Executing email campaign: ${campaign.name}`);
          const results = await sendCampaignEmails(campaign, contacts);

          // Update campaign contacts status to SENT
          for (const contact of contacts) {
            if (!results.errors.find(e => e.contactId === contact.id)) {
              await prisma.campaignContact.updateMany({
                where: {
                  campaignId: campaign.id,
                  contactId: contact.id
                },
                data: {
                  status: 'SENT',
                  sentAt: new Date()
                }
              });
            }
          }

          // Create initial metrics
          await prisma.campaignMetric.create({
            data: {
              campaignId: campaign.id,
              totalSent: results.sent,
              totalDelivered: results.sent,
              metricDate: new Date()
            }
          });

          // Log activity
          await prisma.campaignActivity.create({
            data: {
              campaignId: campaign.id,
              activityType: 'SENT',
              description: `Campaign executed successfully. Sent to ${results.sent} contacts.`,
              metadata: JSON.stringify({
                sent: results.sent,
                failed: results.failed,
                errors: results.errors
              })
            }
          });

          console.log(`✅ Email campaign completed: ${results.sent} sent, ${results.failed} failed`);
        } catch (error) {
          console.error('Campaign execution error:', error);

          // Log failure activity
          await prisma.campaignActivity.create({
            data: {
              campaignId: campaign.id,
              activityType: 'SENT',
              description: `Campaign execution failed: ${error.message}`,
              metadata: JSON.stringify({ error: error.message })
            }
          });
        }
      });

      res.json({
        success: true,
        message: `Campaign launched successfully! Sending to ${campaign.campaignContacts.length} contacts.`
      });

    } else if (campaign.type === 'SOCIAL_MEDIA') {
      const { executeSocialMediaCampaign } = require('../services/socialMediaService');

      // Execute social media post
      setImmediate(async () => {
        try {
          console.log(`🚀 Executing social media campaign: ${campaign.name}`);
          const result = await executeSocialMediaCampaign(campaign);

          // Log activity
          await prisma.campaignActivity.create({
            data: {
              campaignId: campaign.id,
              activityType: 'SENT',
              description: `Posted to ${campaign.socialPlatform}`,
              metadata: JSON.stringify(result)
            }
          });

          console.log(`✅ Social media campaign completed`);
        } catch (error) {
          console.error('Social media campaign error:', error);

          await prisma.campaignActivity.create({
            data: {
              campaignId: campaign.id,
              activityType: 'SENT',
              description: `Social media post failed: ${error.message}`,
              metadata: JSON.stringify({ error: error.message })
            }
          });
        }
      });

      res.json({
        success: true,
        message: `Social media campaign launched successfully!`
      });

    } else {
      return res.status(400).json({ error: `Campaign type ${campaign.type} is not yet supported` });
    }

  } catch (error) {
    console.error('Execute campaign error:', error);
    res.status(500).json({ error: 'Failed to execute campaign' });
  }
});

module.exports = router;
