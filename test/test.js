const expect = require('chai').expect;
const { execSync } = require("child_process");
const fs = require('fs')

var backupdata;

describe('All test', () => {

    after(function (done) {
        console.log("after");
        console.log(backupdata);
        var data = fs.readFileSync("./bin/database.json", 'utf8');
        data = JSON.parse(data);
        data.pop();
        data.pop();
        fs.writeFileSync('./bin/database.json', JSON.stringify(data));
        done();
    });

    describe('List order CLI Initial', () => {

        const response = execSync('llm list_orders', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                'empty database\n'
            );
        });
    });


    describe('Create order 1 CLI', () => {
        const response = execSync('llm create_order "Mong Kok" "Central"', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                '1\n'
            );
        });
    });

    describe('Create order 2 CLI', () => {
        const response = execSync('llm create_order "TST" "SSP"', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                '2\n'
            );
        });
    });

    describe('Take order 1', () => {
        const response = execSync('llm take_order 1', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                ''
            );
        });
    });

    describe('List order After', () => {
        const response = execSync('llm list_orders', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                '2,TST,SSP\n'
            );
        });
    });

    describe('Take unexist order', () => {
        const response = execSync('llm take_order 42', { encoding: 'utf8' }).toString();
        it('should print the correct output', () => {
            expect(response).to.equal(
                'order does not exist\n'
            );
        });
    });


});