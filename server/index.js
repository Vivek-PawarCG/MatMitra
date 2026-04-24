const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Capture startup errors
process.on('uncaughtException', (err) => {
  if (err.message.includes('Could not load the default credentials')) {
    console.warn('💡 Local Mode: GCP Credentials not found. AI/Metrics/Logs might be disabled.');
  } else {
    console.error('🔥 CRITICAL STARTUP ERROR:', err.message);
    process.exit(1);
  }
});

const { log, monitoringClient, projectId } = require('./config/google');

const app = express();

// --- ⚡ PERFORMANCE: Serve Static Files First ---
// This prevents logging/rate-limiting from running on assets (.js, .css, .png)
app.use(express.static(path.join(__dirname, 'public')));

// --- ⚡ EFFICIENCY: Compression ---
app.use(compression());

// --- 🔒 SECURITY: Headers & Protection ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://*"],
      "script-src": ["'self'", "'unsafe-inline'", "https://*"],
      "connect-src": ["'self'", "https://*"],
    },
  },
}));
app.use(hpp());
app.use(express.json({ limit: '10kb' }));

// --- 🔒 SECURITY: CORS ---
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:8080'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// --- 🔒 SECURITY: Rate Limiting (API Only) ---
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: 'AI limit reached. Please wait a minute.' }
});

// Apply limiters only to /api routes
app.use('/api/', globalLimiter);
app.use('/api/chat', aiLimiter);
app.use('/api/insights', aiLimiter);

// 1. Structured Logging Middleware (API Only)
app.use('/api', (req, res, next) => {
  const entry = log.entry({
    httpRequest: {
      requestMethod: req.method,
      requestUrl: req.url,
      status: res.statusCode,
      userAgent: req.get('user-agent'),
      remoteIp: req.ip,
    },
  }, {
    message: `${req.method} ${req.url} from ${req.ip}`,
    severity: 'INFO',
  });
  log.write(entry).catch(() => {});
  next();
});

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

// 4. Wildcard handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 MatMitra Server running on port ${PORT}`);
});
