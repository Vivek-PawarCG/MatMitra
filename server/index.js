const express = require('express');
const cors = require('cors');

// Capture startup errors
process.on('uncaughtException', (err) => {
  if (err.message.includes('Could not load the default credentials')) {
    console.warn('💡 Local Mode: GCP Credentials not found. AI/Metrics/Logs might be disabled.');
  } else {
    console.error('🔥 CRITICAL STARTUP ERROR:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.warn('⚠️ Unhandled Rejection:', reason.message || reason);
});
const { log, monitoringClient, projectId } = require('./config/google');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Structured Logging Middleware
app.use((req, res, next) => {
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
  log.write(entry).catch(console.error);
  next();
});

// 2. Custom Metrics Helper (Cloud Monitoring)
async function reportMetric(metricType, value) {
  if (!monitoringClient) return;

  const dataPoint = {
    interval: {
      endTime: {
        seconds: Math.floor(Date.now() / 1000),
      },
    },
    value: {
      doubleValue: value,
    },
  };

  const timeSeriesData = {
    metric: {
      type: `custom.googleapis.com/${metricType}`,
    },
    resource: {
      type: 'global',
      labels: {
        project_id: projectId,
      },
    },
    points: [dataPoint],
  };

  const request = {
    name: monitoringClient.projectPath(projectId),
    timeSeries: [timeSeriesData],
  };

  try {
    await monitoringClient.createTimeSeries(request);
    console.log(`Metric ${metricType} reported: ${value}`);
  } catch (err) {
    console.error('Error reporting metric:', err.message);
  }
}

// Routes
const chatRoutes = require('./routes/chat');
const insightRoutes = require('./routes/insights');
const analyticsRoutes = require('./routes/analytics');

const path = require('path');

app.use('/api/chat', chatRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/analytics', analyticsRoutes);

// 3. Serve Static Files (The React Frontend)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.send('OK');
});

// 4. Wildcard handler for SPA routing (Express 4 standard syntax)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  reportMetric('server_start', 1).catch(err => {
    console.log("📊 Metrics: Bypassing local report (no credentials)");
  });
});
