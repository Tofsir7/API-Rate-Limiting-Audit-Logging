const requestTracker = new Map();

const RATE_LIMIT = process.env.RATE_LIM;
const TIME_WINDOW = process.env.WINDOW_LIM * 1000;

function rateLimiter(req, res, next) {
  // console.log(req.ip)
  // console.log(req.connection)
  //console.log(RATE_LIMIT);

  const clientIp = req.ip || req.connection.remoteAddress;
  const currentTime = Date.now();

  if (!requestTracker.has(clientIp)) {
    requestTracker.set(clientIp, []);
  }

  const requestTimestamps = requestTracker.get(clientIp);

  const validTimestamps = requestTimestamps.filter(
    timestamp => currentTime - timestamp < TIME_WINDOW
  );

  if (validTimestamps.length >= RATE_LIMIT) {
    req.rateLimitStatus = 'blocked';
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Maximum ${RATE_LIMIT} requests per minute allowed.`,
      retryAfter: Math.ceil((validTimestamps[0] + TIME_WINDOW - currentTime) / 1000) + ' seconds'
    });
  }

  validTimestamps.push(currentTime);
  requestTracker.set(clientIp, validTimestamps);

  req.rateLimitStatus = 'allowed';
  next();
}

module.exports = rateLimiter;
