const WebSocket = require('ws');
const EventEmitter = require('events');

let ws;
let eventEmitter = new EventEmitter();
let current_price = 0;
module.exports.eventEmitter = eventEmitter;

module.exports.init = function(url) {
    if (!url) ws = new WebSocket('wss://ws.cex.io/ws/');
    else ws = new WebSocket(url);
    ws.on('open', function open() {
        ws.send(JSON.stringify(ticker));
        eventEmitter.emit('connected', ws.url);
    });

    ws.on('message', function incoming(data) {
        let j = JSON.parse(data);
        eventEmitter.emit('received', j);

        if (j.data && j.data["symbol1"] == 'BTC' && j.data["symbol2"] == 'USD') {
            if (j.data['price'] != current_price) {
                current_price = j.data['price'];
                eventEmitter.emit("priceChange", current_price);
            }
        }
    });
};
const ticker = {
    "e": "subscribe",
    "rooms": [
        "tickers"
    ]
};

module.exports.close = function () {
    ws.send('close');
};
