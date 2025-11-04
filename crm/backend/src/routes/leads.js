const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads/leads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware to get userId from token
const getUserId = (req) => {
  // In a real app, this would extract userId from JWT token
  // For now, we'll use a placeholder
  return req.userId || 'placeholder-user-id';
};

// ============================================
// LEADS CRUD
// ============================================

// Get all leads
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const leads = await prisma.lead.findMany({
      where: { ownerId: userId },
      include: {
        _count: {
          select: {
            notes: true,
            attachments: true,
            activities: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get single lead with all details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: [
            { isPinned: 'desc' },
            { createdAt: 'desc' }
          ]
        },
        attachments: {
          orderBy: { createdAt: 'desc' }
        },
        activities: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// Create lead
router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const lead = await prisma.lead.create({
      data: {
        ...req.body,
        ownerId: userId
      }
    });
    res.status(201).json(lead);
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Update lead
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await prisma.lead.update({
      where: { id },
      data: req.body
    });
    res.json(lead);
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({
      where: { id }
    });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// ============================================
// LEAD NOTES
// ============================================

// Get notes for a lead
router.get('/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await prisma.leadNote.findMany({
      where: { leadId: id },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create note
router.post('/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.leadNote.create({
      data: {
        ...req.body,
        leadId: id
      }
    });
    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update note
router.put('/:id/notes/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await prisma.leadNote.update({
      where: { id: noteId },
      data: req.body
    });
    res.json(note);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete note
router.delete('/:id/notes/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    await prisma.leadNote.delete({
      where: { id: noteId }
    });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// ============================================
// LEAD ATTACHMENTS
// ============================================

// Get attachments for a lead
router.get('/:id/attachments', async (req, res) => {
  try {
    const { id } = req.params;
    const attachments = await prisma.leadAttachment.findMany({
      where: { leadId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(attachments);
  } catch (error) {
    console.error('Get attachments error:', error);
    res.status(500).json({ error: 'Failed to fetch attachments' });
  }
});

// Upload attachment
router.post('/:id/attachments', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const attachment = await prisma.leadAttachment.create({
      data: {
        leadId: id,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: req.file.path
      }
    });

    res.status(201).json(attachment);
  } catch (error) {
    console.error('Upload attachment error:', error);
    res.status(500).json({ error: 'Failed to upload attachment' });
  }
});

// Download attachment
router.get('/:id/attachments/:attachmentId/download', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    const attachment = await prisma.leadAttachment.findUnique({
      where: { id: attachmentId }
    });

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    res.download(attachment.filePath, attachment.fileName);
  } catch (error) {
    console.error('Download attachment error:', error);
    res.status(500).json({ error: 'Failed to download attachment' });
  }
});

// Delete attachment
router.delete('/:id/attachments/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    const attachment = await prisma.leadAttachment.findUnique({
      where: { id: attachmentId }
    });

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(attachment.filePath)) {
      fs.unlinkSync(attachment.filePath);
    }

    // Delete from database
    await prisma.leadAttachment.delete({
      where: { id: attachmentId }
    });

    res.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Delete attachment error:', error);
    res.status(500).json({ error: 'Failed to delete attachment' });
  }
});

// ============================================
// LEAD ACTIVITIES
// ============================================

// Get activities for a lead
router.get('/:id/activities', async (req, res) => {
  try {
    const { id } = req.params;
    const activities = await prisma.leadActivity.findMany({
      where: { leadId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(activities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Create activity
router.post('/:id/activities', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await prisma.leadActivity.create({
      data: {
        ...req.body,
        leadId: id
      }
    });
    res.status(201).json(activity);
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id/activities/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    const activity = await prisma.leadActivity.update({
      where: { id: activityId },
      data: req.body
    });
    res.json(activity);
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id/activities/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    await prisma.leadActivity.delete({
      where: { id: activityId }
    });
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

module.exports = router;
