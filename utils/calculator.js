const moment = require('moment');

const output = require('./printer');

module.exports = function (currentPrice, latestPrice, currentPercent, dateFormat, decimalPoints) {
    if (latestPrice) {
        let newPercent = (((currentPrice - latestPrice) / latestPrice) * 100).toFixed(decimalPoints);
        if (currentPercent != newPercent) {
            currentPercent = newPercent;
            let now = moment.utc().format(dateFormat);
            output.print(now + " " + currentPercent + "%");
        }
    }
    return currentPercent;
};