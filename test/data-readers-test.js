const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);

const request = require('request');

const coinmarketcap = require('../data-readers/coinmarketcap');
const cex = require('../data-readers/cex');

describe('data readers tests', function () {
    describe('coinmarketcap requester tests', function () {
        this.timeout(10000);
        beforeEach(function () {
            sinon.spy(request, 'get');
        });
        afterEach(function () {
            request.get.restore();
        });
        it('should query server', function (done) {
            coinmarketcap.get((data) => {
                expect(request.get).to.be.called;
                done();
            });
        });
        it('should receive data from server', function (done) {
            coinmarketcap.get((data) => {
                expect(data).to.be.not.null;
                done();
            });
        });
    });
    describe('cex listener tests', function () {
        this.timeout(30000);
        before(function () {
            cex.init();
        });
        after(function () {
            cex.close();
        });
        it('should connect', function (done) {
            setTimeout(() => {
                cex.eventEmitter.on('connected', (data) => {
                    expect(data).to.be.not.null;
                    done();
                });
            }, 100);
        });
        it('should receive messages', function (done) {
            setTimeout(() => {
                cex.eventEmitter.on('received', (data) => {
                    expect(data).to.be.not.null;
                    done();
                });
            }, 100);
        });
    });
});