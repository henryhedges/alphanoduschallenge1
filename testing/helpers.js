var convertJSON = require('../convertJSON')
var handleJSON = convertJSON.handleJSON
var reorganizeByAsset = convertJSON.reorganizeByAsset

var exports = module.exports = {}

// counts the number of trackers per asset
exports.trackerPerAsset = function(object) {
  var totalTrackers = [];
  object.forEach(function(asset){
    totalTrackers.push(asset["nearby-assets"].length)
  });
  return totalTrackers;
}

// handles the result of reorganizeByAsset( some JSON string )
exports.handleTest = function(test) {
  var totalAssets = test.length;
  var totalTrackers = exports.trackerPerAsset( test );

  // object to be used in tests.js
  return {
    totalAssets: totalAssets,
    totalTrackers: totalTrackers
  };
}
