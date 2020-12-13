// const http = require('http');
// http.createServer((request, reponse) => {
//     let body = [];
//     request.on('error', (err) => {
//         console.error('request_err:',err);
//     }).on('data', (chunk) => {
//         body.push(chunk.toString());
//     }).on('end', () => {
//         // body = Buffer.concat(body).toString();
//         console.log("body:", body);
//         reponse.setHeader('Content-type', 'test/html');
//         reponse.setHeader('X-Foo', 'bar');
//         reponse.writeHead(200, {'Content-Type': 'text/plain'});
//         reponse.end(`
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//         </head>
//         <style>
//             body{
//                 background-color: pink;
//             }
//         </style>
//         <body>
//             <div>
//                 <h1>TITLE</h1>
//                 <p class="txt-title">标题</p>
//                 <p>标题</p>
//             </div>
//         </body>
//         </html>
//         `);
//     });
// }).listen(8080);

// console.log('Server started')


const http = require('http');
const server = http.createServer((request, reponse) => {
        console.log("request:", request.headers);
        reponse.setHeader('Content-type', 'test/html');
        reponse.setHeader('X-Foo', 'bar');
        reponse.writeHead(200, {'Content-Type': 'text/plain'});
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
})

server.listen(8080);

console.log('Server started')
