var util = require('util');
var exports = module.exports = {};

// parse text and take callback to modify it
exports.handleJSON = function (json, handleFunction) {
  var trackerJSON = JSON.parse(json);
  return handleFunction(trackerJSON);
};

// reorganize JSON object by assetID rather than trackerID
exports.reorganizeByAsset = function (input) {
  /* If you want to look at your inputs in the console, comment in the 2 lines below */
  // console.log('Your input data from your file:');
  // console.log(util.inspect(input, {depth: null}));

  // object to reorganize and access data for reformatting
  var indexObj = {};
  
  // reorganizeByAssetOutput: this is the object that will be console.logged
  var reorganizeByAssetOutput = [];
  
  // loop through inputs - this will be presented in an array
    // each index contains an object with a trackerID and an array of assetIDs and values
  for (var i = 0; i < input.length; i++){
    var currentTracker = input[i].trackerID;
    var currentAssets = input[i]["nearby-assets"];

    if ( !(currentTracker) ){
      throw Error('trackerID at index ' + i + ' has no value, please make sure the value is not blank');
    };
    
    // loop through each index of the tracked assets 
    for (var j = 0; j < currentAssets.length; j++){
      var currentAsset = currentAssets[j];
      var assetNumber = currentAsset.assetID;

      if ( !(assetNumber) ){
        throw Error('trackerID ' + currentTracker + ', assetID at index ' + j + ' has no value, please make sure the value is not blank');
      };
      
      // this is the new tracker object that will be inserted into the reorganizeByAssetOutput array as a nearby-asset
      var trackerObj = {
        "trackerID" : currentTracker,
        "value" : currentAsset.value
      };
      
      // if the key in indexObj doesn't exist, create it
      if ( !(indexObj[assetNumber]) ){
        indexObj[assetNumber] = { "nearby-assets": [] };
      };
      
      // push the tracker to the correct nearby-asset array
      indexObj[assetNumber]["nearby-assets"].push(trackerObj);
    };
  };
  
  // here, take the reorganized information from the indexObj and reformat it the way we want it
  for (var key in indexObj){
    reorganizeByAssetOutput.push({
      "assetID" : key,
      "nearby-assets": indexObj[key]["nearby-assets"]
    });
  };
  
  // return formatted output
  return reorganizeByAssetOutput;
}