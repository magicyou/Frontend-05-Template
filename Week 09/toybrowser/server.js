const http = require('http');
http.createServer((request, reponse) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("body:", body);
        reponse.writeHead(200, {'Content-Type': 'text/html'});
        reponse.end(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <style>
            body{
                background-color: pink;
            }
        </style>
        <body>
            <div>
                <h1>TITLE</h1>
                <p class="txt-title">标题</p>
                <p>标题</p>
            </div>
        </body>
        </html>
        `);
    });
}).listen(8080);

console.log('Server started')
