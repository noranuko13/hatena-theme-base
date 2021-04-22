const fs = require('fs');
const http = require('http');
const path = require('path');
const { Logger } = require('./core/logger');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  fs.readFile(path.join('./public', req.url), (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  Logger.info('開発サーバーを起動しました', [
    `http://${hostname}:${port}/`,
  ]);
});
