const express = require('express');
const cors = require('cors');
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
    console.error('Error reporting metric:', err);
  }
}

// Routes
const chatRoutes = require('./routes/chat');
const insightRoutes = require('./routes/insights');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/chat', chatRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  reportMetric('server_start', 1);
});
