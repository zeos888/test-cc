const config = require('./config.json');

const requester = require('./data-readers/coinmarketcap');
const listener = require('./data-readers/cex');
const calculator = require('./utils/calculator');

let decimalPoints = 4;
let timeout = 10 * 1000;
let dateFormat = "mm:ss";
if (config) {
    if (config.decimalPoints) {
        decimalPoints = config.decimalPoints;
    }
    if (config.dateFormat) {
        dateFormat = config.dateFormat;
    }
    if (config.timeout) {
        timeout = config.timeout * 1000;
    }
}

let app = {};

app.currentPrice = undefined;
app.latestPrice = undefined;
app.percent = undefined;

app.running = undefined;

app.updateLatestPrice = function () {
    requester.get((newLatestPrice) => {
        app.latestPrice = newLatestPrice;
    });
};

app.updateCurrentPrice = function () {
    listener.eventEmitter.on("priceChange", (data) => {
        app.currentPrice = data;
        app.percent = calculator(app.currentPrice, app.latestPrice, app.percent, dateFormat, decimalPoints);
    });
};

app.start = function () {
    listener.init();
    app.updateLatestPrice();
    app.running = setInterval(function () {
        app.updateLatestPrice();
    }, timeout);
    app.updateCurrentPrice();
};

app.start();

app.stop = function () {
    listener.close();
    clearInterval(app.running);
    process.exit();
};

module.exports = app;