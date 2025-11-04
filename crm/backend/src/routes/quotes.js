const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(quotes);
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Get single quote
router.get('/:id', async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
    });

    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    if (quote.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(quote);
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Create quote
router.post('/', async (req, res) => {
  try {
    const { quoteName, accountName, amount, stage, validUntil } = req.body;

    const quote = await prisma.quote.create({
      data: {
        quoteName,
        accountName,
        amount: parseFloat(amount),
        stage: stage || 'Draft',
        validUntil: new Date(validUntil),
        ownerId: req.user.id,
      },
    });

    res.status(201).json(quote);
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});

// Update quote
router.put('/:id', async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
    });

    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    if (quote.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { quoteName, accountName, amount, stage, validUntil } = req.body;

    const updatedQuote = await prisma.quote.update({
      where: { id: req.params.id },
      data: {
        ...(quoteName && { quoteName }),
        ...(accountName && { accountName }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(stage && { stage }),
        ...(validUntil && { validUntil: new Date(validUntil) }),
      },
    });

    res.json(updatedQuote);
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({ error: 'Failed to update quote' });
  }
});

// Delete quote
router.delete('/:id', async (req, res) => {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: req.params.id },
    });

    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    if (quote.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.quote.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

module.exports = router;
