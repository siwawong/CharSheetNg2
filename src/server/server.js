require('./config/config');

const http = require('http');

const routes = require('./routes/routes');

var server = http.createServer().listen(process.env.PORT, process.env.HOSTNAME);

server.on('request', (req, res) => {    
 
    routes(req, res, (error, result) => {   
        // for now just 404 if url doesn't have a route
        //console.log(`Error: ${error}, Result: ${result}`);
        if (error) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }
        // for now just print routes return result
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<H1>Your temp response</H1><h2>${result}</h2>`);
    });
});
