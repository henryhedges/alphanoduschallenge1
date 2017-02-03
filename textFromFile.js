var prompt = require('prompt')
var fs = require('fs')
var util = require('util')
var convertJSON = require('./convertJSON')

var exports = module.exports = {}
// retrieve string from a file, convert it to JSON and modify it
exports.getAndModifyJSON = function() {

  // the user will be prompted to enter a valid local file name
  console.log('\n Please enter the location of a local text file: ')
  prompt.get(['textFile'], function(err, result){
    
    var file = result.textFile

    //retrieve JSON text from file 
    console.log('\n Getting text from file:  ',file)
    var data = fs.readFileSync(file)

    //function parses text from file into new JSON object
    var jsonTxt = convertJSON.handleJSON(data, convertJSON.reorganizeByAsset)
    var deepJsonTxt = util.inspect(jsonTxt, { depth: null })
    
    //messages that will show up in your console
    console.log('\n Here is the reorganized data:')
    console.log(deepJsonTxt)

    // this function does not return anything, if you want 
    // to return the reorganized JSON object comment in the line below
    // return jsonTxt
  })

}

//this allows the prompt to be called
prompt.start()

// call fn to prompt user
exports.getAndModifyJSON()

