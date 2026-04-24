const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const chatRoutes = require('./routes/chat');
const insightRoutes = require('./routes/insights');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/chat', chatRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Wildcard handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 MatMitra Server running on port ${PORT}`);
});
