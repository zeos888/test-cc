const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;

chai.use(sinonChai);

const printer = require('../utils/printer');
const calculator = require('../utils/calculator');

describe('utils tests', function () {
    describe('printer tests', function () {
        beforeEach(function () {
            sinon.spy(console, 'log');
        });
        afterEach(function () {
            console.log.restore();
        });
        it('should print something', function () {
            printer.print('');
            expect(console.log).to.be.called;
        });
    });
    describe('calculator tests', function () {
        beforeEach(function () {
            sinon.spy(console, 'log');
        });
        afterEach(function () {
            console.log.restore();
        });
        it('should correctly calculate percent', function () {
            expect(+calculator(60, 50, 0, 'hh:mm', 0)).to.be.equal(20);
        });
        it('should print output', function () {
            calculator(60, 50, 0, 'hh:mm', 0);
            expect(console.log).to.be.called;
        })
    })
});