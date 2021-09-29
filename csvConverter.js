const CSVToJSON = require('csvtojson');
// var path = require('path');
const fs = require('fs');


const converter = (csvFile, jsonFile) => {
   CSVToJSON().fromFile(csvFile)
    .then(data => {
        fs.writeFile(jsonFile, JSON.stringify(data, null, 2), {encoding:'utf-8'}, (err) => {
            if(err) {
                console.log(err, 'write to db error')
            }
        })
    }).catch(err => {
        console.log(err);
    }); 
}

module.exports = converter;