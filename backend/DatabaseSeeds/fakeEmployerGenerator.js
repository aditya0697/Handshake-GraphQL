var faker = require('faker');
var fs = require('fs');
var bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { mongoDB } = require('./../utils/config');
var Employer = require('./../models/employer/EmployerModel');
var EmployerAuth = require('../models/employer/EmployerAuthModel');
var Job = require('./../models/job/JobModel');

// faker.seed(309);

   
var employer_size = 20;

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 400,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {

        console.log(`MongoDB Connected`);
    }
});


var employers = [];

var brands = [ "airbnb","amazon", "americanexpress","apple","appnet","automatic","evernote", "facebook", "github", "glassdoor","google","heroku","houzz","hulu","imdb","instagram",];

let getBrand = () => {
    var index = faker.random.number() % brands.length;
    return brands[index];
};

let generateAddress = () => {
    return {
        Street: faker.address.streetName(),
        Apt: faker.address.streetAddress(),
        City: faker.address.city(),
        State: faker.address.state(),
        Zipcode: faker.address.zipCode(),
    }
};

let generateEmployer = () => {
    var address = generateAddress();
    var brand = getBrand();
    return {
        Email: faker.internet.email(),
        EmployerName: faker.company.companyName(),
        PhoneNumber: faker.phone.phoneNumber(),
        ProfileUrl: "http://satyr.io/80x60/"+(faker.random.number() %100)+"?brand=" + brand,
        EmployerDescription: faker.lorem.paragraph(),
        Address: {
            Street: faker.address.streetName(),
            Apt: faker.address.streetAddress(),
            City: faker.address.city(),
            State: faker.address.state(),
            Zipcode: faker.address.zipCode(),
        },
    }
}

var i;
for (i = 0; i < employer_size; i++) {
    employers.push(generateEmployer())
}
// console.log("Employers: ", JSON.stringify(employers));
var password = bcrypt.hashSync("1234", 10);
console.log("Password: ",password);

var employerPromises = () => {
    return  Promise.all(employers.map(function(employer){
        // console.log("employer",JSON.stringify(employer));
        return new Promise(function(resolve, reject){
            var newEmployerAuth =  new EmployerAuth ({
                Email: employer.Email,
                Password: password,
            });
            var newEmployer = new Employer(employer);
            // var newJob = new Job();
            // newStudent.save().then(
            //     studentAuth.save().then(res => resolve(res)).catch(err => reject(err))
            // ).catch(reject("Error"));

            newEmployer.save((error, employerData) => {
                if (error) {
                    reject(error)
                }
                else {
                    newEmployerAuth.save((err, loginData) => {
                        if (err) {
                            reject(err, err)
                        }
                        else {
                            // console.log("signup successful");

                            resolve(null, loginData);
                        }
                    })
                }
            });
        });
    }));
}

employerPromises().then((res)=>{
    console.log("employers are added!",JSON.stringify(res));
}).catch( (err) => {
    console.log("Error: ",JSON.stringify(err));
})

// console.log("Employer: ",JSON.stringify(generateEmployer()));