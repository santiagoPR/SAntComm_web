const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all forecasts
router.get('/', async (req, res) => {
  try {
    const forecasts = await prisma.forecast.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(forecasts);
  } catch (error) {
    console.error('Get forecasts error:', error);
    res.status(500).json({ error: 'Failed to fetch forecasts' });
  }
});

// Get single forecast
router.get('/:id', async (req, res) => {
  try {
    const forecast = await prisma.forecast.findUnique({
      where: { id: req.params.id },
    });

    if (!forecast) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    if (forecast.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(forecast);
  } catch (error) {
    console.error('Get forecast error:', error);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

// Create forecast
router.post('/', async (req, res) => {
  try {
    const { forecastName, ownerName, period, targetRevenue, actualRevenue, achievement, status } = req.body;

    const forecast = await prisma.forecast.create({
      data: {
        forecastName,
        ownerName,
        period,
        targetRevenue: parseFloat(targetRevenue),
        actualRevenue: actualRevenue ? parseFloat(actualRevenue) : 0,
        achievement: achievement ? parseInt(achievement) : 0,
        status: status || 'In Progress',
        ownerId: req.user.id,
      },
    });

    res.status(201).json(forecast);
  } catch (error) {
    console.error('Create forecast error:', error);
    res.status(500).json({ error: 'Failed to create forecast' });
  }
});

// Update forecast
router.put('/:id', async (req, res) => {
  try {
    const forecast = await prisma.forecast.findUnique({
      where: { id: req.params.id },
    });

    if (!forecast) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    if (forecast.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { forecastName, ownerName, period, targetRevenue, actualRevenue, achievement, status } = req.body;

    const updatedForecast = await prisma.forecast.update({
      where: { id: req.params.id },
      data: {
        ...(forecastName && { forecastName }),
        ...(ownerName && { ownerName }),
        ...(period && { period }),
        ...(targetRevenue && { targetRevenue: parseFloat(targetRevenue) }),
        ...(actualRevenue !== undefined && { actualRevenue: parseFloat(actualRevenue) }),
        ...(achievement !== undefined && { achievement: parseInt(achievement) }),
        ...(status && { status }),
      },
    });

    res.json(updatedForecast);
  } catch (error) {
    console.error('Update forecast error:', error);
    res.status(500).json({ error: 'Failed to update forecast' });
  }
});

// Delete forecast
router.delete('/:id', async (req, res) => {
  try {
    const forecast = await prisma.forecast.findUnique({
      where: { id: req.params.id },
    });

    if (!forecast) {
      return res.status(404).json({ error: 'Forecast not found' });
    }

    if (forecast.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.forecast.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Forecast deleted successfully' });
  } catch (error) {
    console.error('Delete forecast error:', error);
    res.status(500).json({ error: 'Failed to delete forecast' });
  }
});

module.exports = router;
