const assert = require('assert');
const current = require('../current');
const latest = require('../latest');
describe('Simple BTC reader', function () {
    describe('latest - module to receive data from coinmarketcap.com', function () {
        it('should connect to server and receive data', function (done) {
            latest((data) => {
                assert.ok(data);
                console.log("-----------> received " + data);
                done();
            });
        })
    });
    describe('current - module to subscribe and receive data from cex.io', function () {
        this.timeout(300000);
        let mockServer;
        before((done) => {
            init();
            //console.log("init");
            done();
        });

        it('should connect to server, receive data, and publish event on price change', function (done) {
            setTimeout(() => {
                current.on("priceChange", (data) => {
                    assert.ok(data);
                    console.log("-----------> received " + data);
                    closeWs();
                    done();
                });
            }, 100);
        });
    });
});