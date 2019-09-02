"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var server = require('../../src/server');
var base = 'http://localhost:4000/';
describe('routes : static', function () {
    describe('GET /', function () {
        it('should return a status code 200 and contain listelot', function (done) {
            axios.get(base)
                .then(function (res) {
                expect(res.status).toBe(200);
                expect(res.data).toBe('Hello ListeLot!');
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
    });
    // END OF TEST SUITE
});
