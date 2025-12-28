const auditLogs = [];

function logRequest(logData) {
  const logEntry = {
    ip: logData.ip,
    endpoint: logData.endpoint,
    timestamp: new Date().toISOString(),
    status: logData.status
  };

  auditLogs.push(logEntry);

  console.log(`IP: ${logEntry.ip} | Endpoint: ${logEntry.endpoint} | Status: ${logEntry.status} | Time: ${logEntry.timestamp}`);
}

function getAllLogs() {
  return auditLogs;
}

function getLogsByIp(ip) {
  return auditLogs.filter(log => log.ip === ip);
}

module.exports = {
  logRequest,
  getAllLogs,
  getLogsByIp
};
