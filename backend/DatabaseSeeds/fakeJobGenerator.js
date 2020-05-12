var faker = require('faker');
const mongoose = require('mongoose');
const { mongoDB } = require('./../utils/config');
var Employer = require('./../models/employer/EmployerModel');
var Job = require('./../models/job/JobModel');
// faker.seed(309);


var job_size = 20;

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
var jobs = [];
var job_types = ["Full Time", "Part Time", "Intern", "On Campus"]

let getEmployer = () => {
    var index = (faker.random.number() % employers.length);
    return employers[index];
}

let getJobType = () => {
    var index = faker.random.number() % job_types.length;
    return job_types[index];
}

let generateJob = () => {
    var employer = getEmployer();
    return {
        EmployerID: employer.EmployerID,
        EmployerName: employer.EmployerName,
        EmployerProfileUrl: employer.EmployerProfileUrl,
        Postion: faker.name.jobTitle(),
        Salary: (faker.random.number() % 10000) + 1000,
        Type: getJobType(),
        PostDate: faker.date.past(),
        Deadline: faker.date.future(),
        Description: faker.lorem.paragraphs(),
        Address: {
            City: faker.address.city(),
            State: faker.address.state(),
            Zipcode: faker.address.zipCode(),
        },
    }
}

// var i;
// for (i = 0; i < employer_size; i++) {
//     employers.push(generateEmployer())
// }
// // console.log("Employers: ", JSON.stringify(employers));

let getAllEmployer = () => {
    return new Promise(function (resolve, reject) {
        Employer.find({}).exec((err, results) => {
            if (err) {
                console.log(err);
                reject();
            } else {
                results.forEach(employer => {
                    var emp = {
                        EmployerID: employer._id,
                        EmployerName: employer.EmployerName,
                        EmployerProfileUrl: employer.ProfileUrl,
                    }
                    employers.push(emp);
                });
                resolve()
            }
        });
    });
}


var jobPromises = () => {
    return  Promise.all(jobs.map(function(job){
        // console.log("employer",JSON.stringify(employer));
        return new Promise(function(resolve, reject){
            let newJob = new Job(job);
            newJob.save((err, jobData) => {
                if (err) {
                    reject(err, err)
                }
                else { 
                   resolve(null, jobData);
                }
            });
        });
    }));
};



getAllEmployer().then(() => {
    var i;
    for (i = 0; i < job_size; i++) {
        jobs.push(generateJob())
    }
    jobPromises().then(()=>{
        console.log("Jobs are Added");
    }).catch((err)=>{
        console.log("err: ",err);
    })
    // console.log("Jobs: ", JSON.stringify(jobs));
     // console.log("Employers: ", JSON.stringify(employers));
}).catch(() => {
    console.log("Error");
})