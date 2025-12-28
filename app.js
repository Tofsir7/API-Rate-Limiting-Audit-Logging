const express = require('express');
const auditMiddleware = require('./middlewares/auditMiddleware');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());

app.use(auditMiddleware);

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.json({
    message: 'Rate Limiting & Audit Logging API',
    endpoints: {
      action: 'POST /api/action'
    },
    rateLimit: {
      maxRequests: 10,
      timeWindow: '1 minute',
    }
  });
});

module.exports = app;