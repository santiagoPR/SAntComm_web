const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (invoice.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

// Create invoice
router.post('/', async (req, res) => {
  try {
    const { invoiceNumber, accountName, amount, status, dueDate, invoiceDate } = req.body;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        accountName,
        amount: parseFloat(amount),
        status: status || 'Pending',
        dueDate: new Date(dueDate),
        invoiceDate: new Date(invoiceDate),
        ownerId: req.user.id,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (invoice.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { invoiceNumber, accountName, amount, status, dueDate, invoiceDate } = req.body;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: req.params.id },
      data: {
        ...(invoiceNumber && { invoiceNumber }),
        ...(accountName && { accountName }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(invoiceDate && { invoiceDate: new Date(invoiceDate) }),
      },
    });

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (invoice.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.invoice.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

module.exports = router;
