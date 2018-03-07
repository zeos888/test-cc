const moment = require('moment');

const latest = require('./latest');
const current = require('./current');

const config = require('./config.json');

let current_price;
let latest_price;
let percent;

let decimalPoints = 4;
let timeout = 10;
let dateFormat = "mm:ss";
if (config){
    if (config.decimalPoints){
        decimalPoints = config.decimalPoints;
    }
    if (config.dateFormat){
        dateFormat = config.dateFormat;
    }
    if (config.timeout){
        timeout = config.timeout;
    }
}

(function () {
    latest((resp) => latest_price = resp);
    setInterval(function () {
        latest((resp) => {
            latest_price = resp;
        });
    }, 1000 * timeout);
})();

init();

current.on("priceChange", (data) => {
    current_price = data;
    if (latest_price){
        let new_percent = (((current_price - latest_price) / latest_price) * 100).toFixed(decimalPoints);
        if (percent != new_percent) {
            percent = new_percent;
            let now = moment.utc().format(dateFormat);
            console.log(now + " " + percent + "%");
        }
    }
});