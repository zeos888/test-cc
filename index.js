const moment = require('moment');

const latest = require('./latest');
const current = require('./current');

const config = require('./config.json');

let current_price;
let latest_price;
let percent;

(function () {
    setInterval(function () {
        latest((resp) => {
            latest_price = resp;
        });
    }, 1000 * config.timeout);
})();

current.on("priceChange", (data) => {
    current_price = data;
    if (latest_price){
        let new_percent = (((current_price - latest_price) / latest_price) / 100).toFixed(config.decimalPoints);
        if (percent != new_percent) {
            percent = new_percent;
            let now = moment.utc().format(config.dateFormat);
            console.log(now + " " + percent + "%");
        }
    }
});