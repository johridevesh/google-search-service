var rp = require('request-promise');

function GoogleSearchService() { }

GoogleSearchService.prototype.getSearchResults = function (searchRequest) {
console.log(" inside service " );
        var searchEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        var options = {
            method: "GET",
            uri:  searchEndpoint,
            qs: searchRequest,
            resolveWithFullResponse: true,
            json: true
        };
        return rp(options).then(function (searchResponse) {
            return searchResponse.body;
        }).catch(function (error) {
            throw error;
        });
    };

module.exports = GoogleSearchService;