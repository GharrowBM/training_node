const http = require('http');
const routes = require('./05_routes')

const server = http.createServer(routes.handler)

server.listen(3000)