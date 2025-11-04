const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// All routes require authentication
router.use(authMiddleware);

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: { ownerId: req.userId },
      include: {
        _count: {
          select: { contacts: true, deals: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// GET single company
router.get('/:id', async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      include: {
        contacts: true,
        deals: true
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// CREATE company
router.post('/', async (req, res) => {
  try {
    const { name, industry, website, phone, email, street, city, state, zipCode } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        industry,
        website,
        phone,
        email,
        street,
        city,
        state,
        zipCode,
        ownerId: req.userId
      }
    });

    res.status(201).json(company);
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// UPDATE company
router.put('/:id', async (req, res) => {
  try {
    const { name, industry, website, phone, email, street, city, state, zipCode } = req.body;

    const company = await prisma.company.updateMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      data: {
        name,
        industry,
        website,
        phone,
        email,
        street,
        city,
        state,
        zipCode
      }
    });

    if (company.count === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const updatedCompany = await prisma.company.findUnique({
      where: { id: req.params.id }
    });

    res.json(updatedCompany);
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// DELETE company
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await prisma.company.deleteMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

module.exports = router;
