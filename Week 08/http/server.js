const http = require('http');
http.createServer((request, reponse) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on(() => {
        body = Buffer.concat(body).toString();
        console.log("body:", body);
        reponse.writeHead(200, {'Content-Type': 'text/html'});
        reponse.end(' Hello World \n');
    });
}).listen(8080);

console.log('Server started')
