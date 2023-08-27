const consol = require('console');
// import { exists } from 'node:fs';
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const portnumber = 3000;

const server = http.createServer((requ, respon) => {

    // consol.log(requ.headers);

    consol.log(`Request method ${requ.url} by method ${requ.method}`);
    if (requ.method == 'GET') {
        let fileUrl;
        if (requ.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = requ.url;
        }
        let fullPath = path.resolve(`./web pages${fileUrl}`);
        console.log(fullPath);
        const fileExtanstion = path.extname(fullPath);
        console.log(fileExtanstion);
        if (fileExtanstion == '.html') {
            fs.exists(fullPath, (param) => {
                if (!param) {
                    respon.statusCode = 404;
                    respon.setHeader('Content-Type', 'text/html');
                    respon.end('<html><body> <h3 class="center">Error Page not found : ' + fileUrl + ' ~Does no Exit:)</h3></body></html>')
                } else {
                    respon.statusCode = 200;
                    respon.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(fullPath).pipe(respon);
                }
            });

        } else {
            respon.statusCode = 404;
            respon.setHeader('Content-Type', 'text/html');
            respon.end(`<html><body> <h1 class="center">Error Page not found :${fileUrl} is not a htnl file:)</h1></body></html>`)
        }
    } else {
        respon.statusCode = 404;
        respon.setHeader('Content-Type', 'text/html');
        respon.end('<html><body> <h1 class="center">Error Page not found :' + fileUrl + ' Not Supported:)</h1></body></html>')
    }

});

server.listen(portnumber, hostname, () => {
    console.log(`Server Running at http://${hostname}:${portnumber}`);
});



