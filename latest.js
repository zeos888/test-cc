const request = require('request');
const url = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
module.exports = latest;

function latest(callback) {
    let r;
    request.get(url, {json: true}, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            r = body[0].price_usd;
            callback(r);
        }
    });
}