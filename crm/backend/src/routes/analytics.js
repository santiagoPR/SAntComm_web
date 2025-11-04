const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET campaign metrics
router.get('/campaigns/:id/metrics', async (req, res) => {
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

    // Get latest metrics
    const latestMetric = await prisma.campaignMetric.findFirst({
      where: {
        campaignId: req.params.id
      },
      orderBy: {
        metricDate: 'desc'
      }
    });

    // Get all metrics for trend analysis
    const allMetrics = await prisma.campaignMetric.findMany({
      where: {
        campaignId: req.params.id
      },
      orderBy: {
        metricDate: 'asc'
      }
    });

    // Calculate real-time metrics from campaign contacts
    const contactStats = await prisma.campaignContact.groupBy({
      by: ['status'],
      where: {
        campaignId: req.params.id
      },
      _count: {
        status: true
      }
    });

    const realtimeMetrics = {
      totalSent: 0,
      totalDelivered: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalConverted: 0,
      totalBounced: 0,
      totalUnsubscribed: 0
    };

    contactStats.forEach(stat => {
      const count = stat._count.status;
      if (stat.status === 'SENT' || stat.status === 'DELIVERED' || stat.status === 'OPENED' || stat.status === 'CLICKED' || stat.status === 'CONVERTED') {
        realtimeMetrics.totalSent += count;
      }
      if (stat.status === 'DELIVERED' || stat.status === 'OPENED' || stat.status === 'CLICKED' || stat.status === 'CONVERTED') {
        realtimeMetrics.totalDelivered += count;
      }
      if (stat.status === 'OPENED' || stat.status === 'CLICKED' || stat.status === 'CONVERTED') {
        realtimeMetrics.totalOpened += count;
      }
      if (stat.status === 'CLICKED' || stat.status === 'CONVERTED') {
        realtimeMetrics.totalClicked += count;
      }
      if (stat.status === 'CONVERTED') {
        realtimeMetrics.totalConverted += count;
      }
      if (stat.status === 'BOUNCED') {
        realtimeMetrics.totalBounced += count;
      }
      if (stat.status === 'UNSUBSCRIBED') {
        realtimeMetrics.totalUnsubscribed += count;
      }
    });

    // Calculate rates
    const openRate = realtimeMetrics.totalDelivered > 0
      ? (realtimeMetrics.totalOpened / realtimeMetrics.totalDelivered * 100).toFixed(2)
      : 0;
    const clickRate = realtimeMetrics.totalOpened > 0
      ? (realtimeMetrics.totalClicked / realtimeMetrics.totalOpened * 100).toFixed(2)
      : 0;
    const conversionRate = realtimeMetrics.totalSent > 0
      ? (realtimeMetrics.totalConverted / realtimeMetrics.totalSent * 100).toFixed(2)
      : 0;
    const bounceRate = realtimeMetrics.totalSent > 0
      ? (realtimeMetrics.totalBounced / realtimeMetrics.totalSent * 100).toFixed(2)
      : 0;

    res.json({
      campaign,
      latestMetric,
      allMetrics,
      realtimeMetrics,
      calculatedRates: {
        openRate: parseFloat(openRate),
        clickRate: parseFloat(clickRate),
        conversionRate: parseFloat(conversionRate),
        bounceRate: parseFloat(bounceRate)
      }
    });
  } catch (error) {
    console.error('Get campaign metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign metrics' });
  }
});

// UPDATE campaign metrics manually
router.post('/campaigns/:id/metrics', async (req, res) => {
  try {
    const {
      totalSent,
      totalDelivered,
      totalOpened,
      totalClicked,
      totalConverted,
      totalBounced,
      totalUnsubscribed,
      leadsGenerated,
      revenue,
      costPerLead,
      roi
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

    const metric = await prisma.campaignMetric.create({
      data: {
        campaignId: req.params.id,
        totalSent: totalSent || 0,
        totalDelivered: totalDelivered || 0,
        totalOpened: totalOpened || 0,
        totalClicked: totalClicked || 0,
        totalConverted: totalConverted || 0,
        totalBounced: totalBounced || 0,
        totalUnsubscribed: totalUnsubscribed || 0,
        leadsGenerated: leadsGenerated || 0,
        revenue: revenue ? parseFloat(revenue) : 0,
        costPerLead: costPerLead ? parseFloat(costPerLead) : null,
        roi: roi ? parseFloat(roi) : null
      }
    });

    res.status(201).json(metric);
  } catch (error) {
    console.error('Create campaign metric error:', error);
    res.status(500).json({ error: 'Failed to create campaign metric' });
  }
});

// GET campaign activities
router.get('/campaigns/:id/activities', async (req, res) => {
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

    const activities = await prisma.campaignActivity.findMany({
      where: {
        campaignId: req.params.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    });

    res.json(activities);
  } catch (error) {
    console.error('Get campaign activities error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign activities' });
  }
});

// CREATE campaign activity log
router.post('/campaigns/:id/activities', async (req, res) => {
  try {
    const { activityType, description, metadata } = req.body;

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const activity = await prisma.campaignActivity.create({
      data: {
        campaignId: req.params.id,
        activityType,
        description,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Create campaign activity error:', error);
    res.status(500).json({ error: 'Failed to create campaign activity' });
  }
});

// GET overall analytics dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Get all user's campaigns
    const campaigns = await prisma.campaign.findMany({
      where: {
        ownerId: req.userId
      },
      include: {
        _count: {
          select: {
            campaignContacts: true
          }
        }
      }
    });

    // Get total counts by status
    const statusCounts = await prisma.campaign.groupBy({
      by: ['status'],
      where: {
        ownerId: req.userId
      },
      _count: {
        status: true
      }
    });

    // Get all campaign contacts for overall metrics
    const allCampaignIds = campaigns.map(c => c.id);

    const contactStats = await prisma.campaignContact.groupBy({
      by: ['status'],
      where: {
        campaignId: {
          in: allCampaignIds
        }
      },
      _count: {
        status: true
      }
    });

    // Calculate overall metrics
    const overallMetrics = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
      totalContacts: campaigns.reduce((sum, c) => sum + c._count.campaignContacts, 0),
      totalSent: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalConverted: 0
    };

    contactStats.forEach(stat => {
      const count = stat._count.status;
      if (['SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'CONVERTED'].includes(stat.status)) {
        overallMetrics.totalSent += count;
      }
      if (['OPENED', 'CLICKED', 'CONVERTED'].includes(stat.status)) {
        overallMetrics.totalOpened += count;
      }
      if (['CLICKED', 'CONVERTED'].includes(stat.status)) {
        overallMetrics.totalClicked += count;
      }
      if (stat.status === 'CONVERTED') {
        overallMetrics.totalConverted += count;
      }
    });

    // Get recent activities across all campaigns
    const recentActivities = await prisma.campaignActivity.findMany({
      where: {
        campaignId: {
          in: allCampaignIds
        }
      },
      include: {
        campaign: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    // Get top performing campaigns
    const campaignsWithMetrics = await Promise.all(
      campaigns.map(async (campaign) => {
        const contacts = await prisma.campaignContact.groupBy({
          by: ['status'],
          where: {
            campaignId: campaign.id
          },
          _count: {
            status: true
          }
        });

        let converted = 0;
        let total = 0;
        contacts.forEach(stat => {
          total += stat._count.status;
          if (stat.status === 'CONVERTED') {
            converted = stat._count.status;
          }
        });

        return {
          ...campaign,
          conversionRate: total > 0 ? (converted / total * 100).toFixed(2) : 0,
          totalContacts: total
        };
      })
    );

    const topCampaigns = campaignsWithMetrics
      .sort((a, b) => parseFloat(b.conversionRate) - parseFloat(a.conversionRate))
      .slice(0, 5);

    res.json({
      overallMetrics,
      statusCounts,
      topCampaigns,
      recentActivities,
      campaigns: campaignsWithMetrics
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
});

module.exports = router;
