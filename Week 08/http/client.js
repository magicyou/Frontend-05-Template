const net = require('net');
const { parse } = require('path');

class Request {

    constructor (options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-type"]) {
            this.headers['Content-type'] = "application/x-www-form-urlencode"
        }

        if (this.headers['Content-type'] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-type'] === "application/x-www-form-urlencode") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers['Content-Length'] = this.bodyText.length;
    }

    send () {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                });
            }

            connection.on('data', (data) => {
                console.log(dataa.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    connection.end();
                }
            });

            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }
}


void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8080',
        path: '/',
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: 'lxl'
        }
    });

    let response = await request.send();
    console.log(response);
}()