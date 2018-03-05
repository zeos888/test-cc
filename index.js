const request = require('request');
const moment = require('moment');

const latest = require('./latest');
const current = require('./current');

let current_price;
let latest_price;
let percent;

// latest('https://api.coinmarketcap.com/v1/ticker/bitcoin/', (resp) => {
//     current_price = resp;
//     console.log(current_price);
// });

(function() {
    var c = 0;
    var timeout = setInterval(function() {
        latest((resp) => {
            latest_price = resp;
            console.log("latest = " + latest_price);
        });
    }, 10000);
})();

current.on("priceChange", (data) => {
    current_price = data;
    console.log("current = " + current_price);
    if (latest_price && percent != (current_price / latest_price)/100){
        percent = (current_price / latest_price)/100;
        let now = moment.utc().format("mm:ss");
        console.log("now, on " + now + " percent = " + percent);
    }
});