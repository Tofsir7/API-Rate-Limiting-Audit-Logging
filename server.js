const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);
server.on('listening', ()=> {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    if(error.code === 'EADDRINUSE') {
        console.error(`ERROR: Port ${PORT} is already in use.\n`);
        process.exit(1);
    }
    else if( error.code === 'EACCES') {
        console.error(`ERROR: Permission denied to use this port\n`);
        process.exit(1);
    }
    else {
        console.error(`SERVER ERROR: ${error.message}\n`);
        process.exit(1);
    }
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  console.error(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});