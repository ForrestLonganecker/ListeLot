require('dotenv').config();
const app = require('./app');
const http = require('http');

const port = normalizePort(process.env.PORT || '4000');

const server = http.createServer(app);

server.listen(port);

function normalizePort(val: string){
  const port = parseInt(val, 10);
  if(isNaN(port)){
    return val;
  }
  if(port >= 0){
    return port;
  }
  return false;
}

server.on('listening', () => {
  console.log(`ListeLot listening on port ${port}`);  
});

export {};