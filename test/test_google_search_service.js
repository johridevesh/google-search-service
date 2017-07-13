'use strict'

var GoogleSearchService = require('./../src/google_search_service');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var Seneca = require('seneca');

var searchService = new GoogleSearchService();
var expect = chai.expect;

function test_seneca(callback) {
    return Seneca({log: 'test'}).test(callback).use(require('./../src/google_search_service'));
}

describe('google_search_service', function () {
    describe('getSearchResults', function() {
        context('With Latitude and Longitude', function() {
            it('returns a list of restaurants', function() {
                var searchRequest = {
                    "location": "50.943744, 6.940440",
                    "term": "restaurant",
                    "rankby": "distance"
                }
                searchService.getSearchResults(searchRequest).then(function(response) {
                    expect(parseInt(response.total)).to.be.gte(0);
                });                
            });
        });
    });
});