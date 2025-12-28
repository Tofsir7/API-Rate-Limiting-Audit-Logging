# API Rate Limiting & Audit Logging

A Node.js API demonstrating IP-based rate limiting and request audit logging.

## Installation

```bash
git clone https://github.com/Tofsir7/API-Rate-Limiting-Audit-Logging.git
cd API-Rate-Limiting-Audit-Logging
npm install
```

Create `.env` file:
```env
PORT=3000
RATE_LIM=10
WINDOW_LIM=60
```

Start server:
```bash
npm start
```

## API Endpoint

**POST** `/api/action`

Success Response (200):
```json
{
  "success": true,
  "message": "Request processed successfully",
  "timestamp": "2025-12-28T10:30:45.123Z"
}
```

Rate Limited Response (429):
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Maximum 10 requests per minute allowed.",
  "retryAfter": "45 seconds"
}
```

## Rate Limiting Rules

- **Limit**: 10 requests per minute per IP address (configurable)
- **Algorithm**: Sliding window
- **Behavior**: Returns HTTP 429 when limit exceeded with retry information

## Audit Logging

Every request is logged with:
- IP address
- Endpoint path
- Timestamp (ISO 8601 format)
- Status (`allowed` or `blocked`)

**Console Output:**
```
IP: 192.168.1.100 | Endpoint: /api/action | Status: allowed | Time: 2025-12-28T10:30:45.123Z
```

## Testing
Using Postman

- Create a new POST request to http://localhost:3000/api/action
- Click "Send" button 10 times rapidly
- On the 11th request, you should receive a 429 error with retry information
- Wait for the specified retryAfter duration
- Try again - request should succeed

**Expected Result:**
- First 10 requests: Success (200)
- 11th request: Rate limited (429)

## Storage Choice

**Implementation**: In-memory storage using JavaScript Map and Array

**Reasoning:**
- Simple with no external dependencies
- Fast O(1) lookups
- Meets assignment requirements
- Data lost on server restart
- Not suitable for multi-server deployments

**Production Alternative**: Redis would provide persistence and distributed rate limiting across multiple servers.

## Configuration

Environment variables in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `RATE_LIM` | Max requests per window | 10 |
| `WINDOW_LIM` | Time window (seconds) | 60 |

## Assumptions
- Single server deployment (no load balancer)
- Logs stored in memory (not persisted)
- IPv4/IPv6 addresses handled automatically
 
## Author

Khayrul Hassan Khan