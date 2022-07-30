const http = require('http')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const serve = serveStatic('./src', { index: ['index.html', 'index.htm'] })

// Create server
var server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3000)