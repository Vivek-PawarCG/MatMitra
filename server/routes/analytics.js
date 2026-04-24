const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { bigquery } = require('../config/google');

const DATASET_ID = 'matmitra_analytics';
const TABLE_ID = 'user_interactions';

const TrackSchema = z.object({
  eventType: z.string().min(1),
  details: z.any(),
  userId: z.string().optional()
});

/**
 * @route POST /api/analytics/track
 * @desc  Log user interactions to BigQuery for civil readiness analytics
 * @access Public
 */
router.post('/track', async (req, res) => {
  try {
    const { eventType, details, userId } = TrackSchema.parse(req.body);

    const rows = [
      {
        timestamp: new Date().toISOString(),
        userId: userId || 'anonymous',
        eventType: eventType,
        details: JSON.stringify(details),
      },
    ];

    await bigquery.dataset(DATASET_ID).table(TABLE_ID).insert(rows);
    res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid tracking data', details: err.errors });
    }
    console.error('BigQuery insert error:', err.message);
    res.status(500).json({ error: 'Failed to record analytics', details: err.message });
  }
});

module.exports = router;
