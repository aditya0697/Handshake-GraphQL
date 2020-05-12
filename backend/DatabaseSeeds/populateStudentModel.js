var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Student = require('./../models/student/StudentModel');
var StudentAuth = require('../models/student/StudentAuthModel');

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    //rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
       if (rawFile.readyState === 4 && rawFile.status == "200") {
           callback(rawFile.responseText);
       }
    };
    rawFile.send(null);
}

//usage:
readTextFile("./root/backend/DatabaseSeeds/fakeStudents.txt", function(text){
    var data = JSON.parse(text);
    console.log(data);
});


console.log("Finished!");