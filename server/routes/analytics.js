const express = require('express');
const router = express.Router();
const { bigquery } = require('../config/google');

const DATASET_ID = 'matmitra_analytics';
const TABLE_ID = 'user_interactions';

router.post('/track', async (req, res) => {
  const { eventType, details, userId } = req.body;

  const rows = [
    {
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous',
      eventType: eventType, // 'quiz_complete', 'ai_chat', 'checklist_click'
      details: JSON.stringify(details),
    },
  ];

  try {
    // Note: Ensuring the table exists would usually be done via a setup script.
    // For this prototype, we attempt to insert.
    await bigquery.dataset(DATASET_ID).table(TABLE_ID).insert(rows);
    res.json({ success: true });
  } catch (err) {
    // If it fails because dataset/table doesn't exist, we log it and fail gracefully
    console.error('BigQuery insert error:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Failed to record analytics', details: err.message });
  }
});

module.exports = router;
