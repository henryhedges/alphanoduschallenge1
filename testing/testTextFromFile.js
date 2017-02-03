var fs = require('fs')
var util = require('util')
var convertJSON = require('../convertJSON')

var exports = module.exports = {}
// retrieve string from a file, convert it to JSON and modify it
exports.getAndModifyJSON = function(fileLocation) {

  var data = fs.readFileSync(fileLocation)
  var jsonFromTxt = convertJSON.handleJSON(data, convertJSON.reorganizeByAsset)
  // this is a string value - it shows all data in the JSON object
  
  /* If you want to see the full JSON output displayed during testing, uncomment
      the text below */
  // var deepJsonTxt = util.inspect(jsonFromTxt, { depth: null })
  // console.log('Output from your file: ')
  // console.log(deepJsonTxt)
  return jsonFromTxt
}
