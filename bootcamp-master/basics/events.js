const EventEmmiter = require('events');
const http = require('http');

class Sales extends EventEmmiter {
    constructor() {
        super();
    }
}

// const myEmitter = new EventEmmiter();
const myEmitter = new Sales();

// OBSERVER PATTEN
myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
    console.log('Customer name: José');
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit('newSale', 9);


// EXAMPLE WITH SERVER
const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received!');
    console.log(req.url);
    res.end('Request received');
});

server.on('request', (req, res) => {
    console.log("Another request ☀");
});

server.on('close', () => {
    console.log("Server closed");
});

server.listen(8000, '127.0.0.1', () => {
    console.log("waiting for the request");
});

