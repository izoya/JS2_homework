// console.log('node');
// const os = require('os');
// const a = require('./func.js');
// console.log(a(10));


const fs = require('fs');
const users = [{name: 'Ann', age: 30}];
fs.writeFile('db.json', JSON.stringify(users), (err) => {
    if (err) {
        console.log(err);
    }
});
fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const list = JSON.parse(data);
        list.push();
        console.log(list);
        fs.writeFile('db.json', JSON.stringify(list), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello, world!');
        res.end();
    }
    if (req.url === '/api/users') {
        fs.readFile('db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.write(data);
                res.end();
            }
        });
    }
});
server.listen(300);
server.on('connection', (socket) => {
     console.log('New connection!');
});

