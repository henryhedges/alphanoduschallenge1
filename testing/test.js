var assert = require('chai').assert
var path = require('path').dirname
// textFromFile modified for tests 
var testTextFromFile = require('./testTextFromFile')
//helper functions for the tests
var helpers = require('./helpers')
var handleTest = helpers.handleTest
//JSON conversion functions
var convertJSON = require('../convertJSON')
var handleJSON = convertJSON.handleJSON

var testLoc1 = '/sampleText/sampleText1.txt'
var testLoc2 = '/sampleText/sampleText2.txt'
var testLoc3 = '/sampleText/sampleText3.txt'
var testLoc4 = '/sampleText/sampleText4.txt'
var testLoc5 = '/sampleText/sampleText5.txt'
var testLoc6 = '/sampleText/sampleText6.txt'

describe('Return object after JSON is modified: ', function() {
  it('should return an array', function() {
    console.log('testing')
    var testComplete = testTextFromFile.getAndModifyJSON(__dirname + testLoc1)
    assert.isArray(testComplete)
  })
})

describe('Output', function() {
  describe('Return correct amount of assests and trackers per asset', function () {
    it('Test string 1 - should return 3 assets with 1 tracker each', function () {
      var testComplete = testTextFromFile.getAndModifyJSON(__dirname + testLoc1)
      var test = handleTest( testComplete );
      assert.equal( test.totalAssets, 3 );
      assert.deepEqual( test.totalTrackers, [1,1,1] );
    });  
  
    it('Test string 2 - should return 4 assets with 6, 6, 6, and 1 tracker each, respectively', function () {
      var testComplete = testTextFromFile.getAndModifyJSON(__dirname + testLoc2)
      var test = handleTest( testComplete );
      assert.equal( test.totalAssets, 4 );
      assert.deepEqual( test.totalTrackers, [6,6,6,1] );
    });  
  
    it('Test string 3 - should return 3 assets with 3 tracker each', function () {
      var testComplete = testTextFromFile.getAndModifyJSON(__dirname + testLoc3)
      var test = handleTest( testComplete );
      assert.equal( test.totalAssets, 3 );
      assert.deepEqual( test.totalTrackers, [3,3,3] );
    });  

    it('Test string 4 - should return 7 assets with 3, 3, 3, 1, 1, 1, and 1 tracker each, respectively', function () {
      var testComplete = testTextFromFile.getAndModifyJSON(__dirname + testLoc4)
      var test = handleTest( testComplete );
      assert.equal( test.totalAssets, 7 );
      assert.deepEqual( test.totalTrackers, [ 3, 3, 3, 1, 1, 1, 1 ] );
    });  
  });

  describe('Error handling', function () {
    it('Should throw an error if no tracker is designated', function(){
      var testComplete = function() {testTextFromFile.getAndModifyJSON(__dirname + testLoc5)};
      assert.throws( testComplete, Error, 'trackerID at index 0 has no value, please make sure the value is not blank');
    });

    it('Should throw an error if no assetID is designated', function(){
      var testComplete = function() {testTextFromFile.getAndModifyJSON(__dirname + testLoc6)};
      assert.throws( testComplete, Error, 'trackerID 1, assetID at index 0 has no value, please make sure the value is not blank');
    });
  })
  
});
