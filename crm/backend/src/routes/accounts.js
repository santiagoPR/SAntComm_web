const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Get single account
router.get('/:id', async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(account);
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
});

// Create account
router.post('/', async (req, res) => {
  try {
    const { accountName, accountOwner, phone, website, annualRevenue, industry, type } = req.body;

    const account = await prisma.account.create({
      data: {
        accountName,
        accountOwner,
        phone: phone || null,
        website: website || null,
        annualRevenue: annualRevenue ? parseFloat(annualRevenue) : null,
        industry: industry || null,
        type: type || 'Prospect',
        ownerId: req.user.id,
      },
    });

    res.status(201).json(account);
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Update account
router.put('/:id', async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { accountName, accountOwner, phone, website, annualRevenue, industry, type } = req.body;

    const updatedAccount = await prisma.account.update({
      where: { id: req.params.id },
      data: {
        ...(accountName && { accountName }),
        ...(accountOwner && { accountOwner }),
        ...(phone !== undefined && { phone }),
        ...(website !== undefined && { website }),
        ...(annualRevenue !== undefined && { annualRevenue: annualRevenue ? parseFloat(annualRevenue) : null }),
        ...(industry !== undefined && { industry }),
        ...(type && { type }),
      },
    });

    res.json(updatedAccount);
  } catch (error) {
    console.error('Update account error:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Delete account
router.delete('/:id', async (req, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.account.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
