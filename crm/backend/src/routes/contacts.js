const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// All routes require authentication
router.use(authMiddleware);

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: { ownerId: req.userId },
      include: {
        company: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      include: {
        company: true,
        deals: true
      }
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// CREATE contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, companyId } = req.body;

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        position,
        companyId: companyId || null,
        ownerId: req.userId
      },
      include: {
        company: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// UPDATE contact
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, companyId } = req.body;

    const contact = await prisma.contact.updateMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
        position,
        companyId: companyId || null
      }
    });

    if (contact.count === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedContact = await prisma.contact.findUnique({
      where: { id: req.params.id },
      include: {
        company: {
          select: { id: true, name: true }
        }
      }
    });

    res.json(updatedContact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await prisma.contact.deleteMany({
      where: {
        id: req.params.id,
        ownerId: req.userId
      }
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
