var GoogleSearchService = require('./google_search_service');
var searchService = new GoogleSearchService();


module.exports = function (options) {
  var seneca = this;

  seneca.add({ "role": "google", "cmd": "search" }, function (args, done) {
      console.log("inside plugin");
      console.log(JSON.parse(args.args.body));
    searchService.getSearchResults(JSON.parse(args.args.body)).then(function (results) {
      console.log(results.total);
      done(null, results);
    }).catch(function (error) {
            if (error.statusCode >= 400 || error.statusCode <= 499) {
                done(null, { "error": error.message });
            } else {
                done(null, { "error": error.message });
            }
        });
    });
};