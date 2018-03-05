const WebSocket = require('ws');
const EventEmitter = require('events');

const ws = new WebSocket('wss://ws.cex.io/ws/');
let eventEmitter = new EventEmitter();
let current_price = 0;
module.exports = eventEmitter;

const ticker = {
    "e": "subscribe",
    "rooms": [
        "tickers"
    ]
};

ws.on('open', function open() {
    //console.log('connected');
    ws.send(JSON.stringify(ticker));
});

ws.on('close', function close() {
    //console.log('disconnected');
});

ws.on('message', function incoming(data) {
    let j = JSON.parse(data);

    if (j.data && j.data["symbol1"] == 'BTC' && j.data["symbol2"] == 'USD'){
        if (j.data['price'] != current_price) {
            current_price = j.data['price'];
            eventEmitter.emit("priceChange", current_price);
            //console.log(current_price);
        }
    }
    //console.log(j.data);
});