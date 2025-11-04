const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// All routes require authentication
router.use(authMiddleware);

// GET all deals
router.get('/', async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      where: { ownerId: req.userId },
      include: {
        company: {
          select: { id: true, name: true }
        },
        contact: {
          select: { id: true, firstName: true, lastName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(deals);
  } catch (error) {
    console.error('Get deals error:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

// GET single deal
router.get('/:id', async (req, res) => {
  try {
    const deal = await prisma.deal.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      include: {
        company: true,
        contact: true
      }
    });

    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.json(deal);
  } catch (error) {
    console.error('Get deal error:', error);
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
});

// CREATE deal
router.post('/', async (req, res) => {
  try {
    const { title, value, stage, companyId, contactId, expectedCloseDate, probability } = req.body;

    const deal = await prisma.deal.create({
      data: {
        title,
        value: parseFloat(value) || 0,
        stage: stage || 'Lead',
        companyId: companyId || null,
        contactId: contactId || null,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        probability: parseInt(probability) || 50,
        ownerId: req.userId
      },
      include: {
        company: {
          select: { id: true, name: true }
        },
        contact: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.status(201).json(deal);
  } catch (error) {
    console.error('Create deal error:', error);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

// UPDATE deal
router.put('/:id', async (req, res) => {
  try {
    const { title, value, stage, status, companyId, contactId, expectedCloseDate, probability } = req.body;

    const updateData = {
      title,
      value: value !== undefined ? parseFloat(value) : undefined,
      stage,
      status,
      companyId: companyId || null,
      contactId: contactId || null,
      expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : undefined,
      probability: probability !== undefined ? parseInt(probability) : undefined
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const deal = await prisma.deal.updateMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      data: updateData
    });

    if (deal.count === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    const updatedDeal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: {
        company: {
          select: { id: true, name: true }
        },
        contact: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    });

    res.json(updatedDeal);
  } catch (error) {
    console.error('Update deal error:', error);
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

// DELETE deal
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await prisma.deal.deleteMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Delete deal error:', error);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

module.exports = router;
