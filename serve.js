// Мини-сервер для просмотра сайта локально: node site/serve.js → http://localhost:4173
var http = require('http'), fs = require('fs'), path = require('path');
var root = __dirname, port = 4173;
var types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
http.createServer(function (req, res) {
  var p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  var file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, function (err, data) {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, function () { console.log('Сайт: http://localhost:' + port); });
