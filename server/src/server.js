require('dotenv').config();
const app = require('./app');
const http = require('http');

const port = 4000;

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  console.log(`ListeLot listening on port ${port}`);  
});