const { logRequest } = require('../services/auditLogger');

function auditMiddleware(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress;
  const endpoint = req.path;

  res.on('finish', () => {
    const status = req.rateLimitStatus || 'allowed';

    logRequest({
      ip: clientIp,
      endpoint: endpoint,
      status: status
    });
  });

  next();
}

module.exports = auditMiddleware;
