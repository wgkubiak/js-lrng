const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');

    if(url === "/") {
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end();
    }

    if(url === "/message" && method === "POST") {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, error => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }

    res.write('<html>')
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello</h1></body>');
    res.write('</html>')
    res.end();
}

// module.exports = { 
//     handler: requestHandler,
//     someText: 'Hi'
// };

exports.handler = requestHandler;
exports.someText = 'Hi';