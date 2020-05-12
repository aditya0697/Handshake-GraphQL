var faker = require('faker');
var fs = require('fs');
var bcrypt = require("bcrypt");
const mongoose = require('mongoose'); 
const { mongoDB } = require('./../utils/config');
var Student = require('./../models/student/StudentModel');
var StudentAuth = require('../models/student/StudentAuthModel');

// faker.seed(309);

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

var students = []
var Schools = ["San Jose State University", "Santa Clara University", "New York University", "California State University Long Beach", "Stanford University"];
var Majors = ["Computer Engineering", "Software Engineerings", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Chemical Engineering", "Biomedical Engineering"];
var Levels = ["Bachelor of Engineering", "Master of Engineering", "Master of Science"];
var skills = ["Python","Java","React","Kafka","C","C++","Android","PHP","MongoDb","MySQL","R","Machine Learning","SAS","SPSS","HTML","CSS","Spark"];


let generateEducation = () => {
    var random_school = (faker.random.number() % Schools.length);
    var random_major = (faker.random.number() % Majors.length);
    var random_level = (faker.random.number() % Levels.length);
    return {
        School: Schools[random_school],
        Major: Majors[random_major],
        Level: Levels[random_level],
        GradDate: faker.date.future(),
        GPA: (faker.random.number() % 3) + 2,
    }
}

let generateExperience = () => {
    var startDate = faker.date.past()
    return {
        Employer: faker.company.companyName(),
        Title: faker.name.jobTitle(),
        Description: faker.lorem.sentences(),
        StartDate: startDate,
        EndDate: faker.date.between(startDate, new Date()),
    }
}


let generateSkill = () => {
    var index = faker.random.number()%skills.length;
    return skills[index];
}

let generateEducations = () => {
    var educations = [];
    var size = faker.random.number() % 2 + 1;
    var i;
    for (i = 0; i < size; i++) {
        educations.push(generateEducation());
    }
    return educations;
}

let generateExperiences = () => {
    var experiences = [];
    var size = faker.random.number() % 3 + 1;
    var i;
    for (i = 0; i < size; i++) {
        experiences.push(generateExperience());
    }
    return experiences;
}

let generateSkills = () => {
    var skills = [];
    var size = faker.random.number() % 10 ;
    var i;
    for (i = 0; i < size; i++) {
        skills.push(generateSkill());
    }
    return skills;
}


let generateStudent = () => {

    var experiences = generateExperience();
    var educations = generateEducation();
    var skills = generateSkills();
    return {
        Email: faker.internet.email(),
        FirstName: faker.name.firstName(),
        LastName: faker.name.lastName(),
        PhoneNumber: faker.phone.phoneNumber(),
        CareerObjective: faker.lorem.paragraph(),
        Educations: educations,
        Experiences: experiences,
    }
}

var i;
for (i = 0; i < 10; i++) {
    students.push(generateStudent())
}
console.log("Students: ", JSON.stringify(students));
// var jsonData = JSON.stringify(students);

// fs.writeFile("./root/backend/DatabaseSeeds/fakeStudents.txt",jsonData , function(err) {
//     if (err) {
//         console.log(err);
//     }
// });

var password = bcrypt.hashSync("Ss123456", 10);
console.log("Password: ",password);

var studentPromises = () => {
    return  Promise.all(students.map(function(student){
        console.log("student",JSON.stringify(student));
        return new Promise(function(resolve, reject){
            var newStudentAuth =  new StudentAuth ({
                Email: student.Email,
                Password: password,
            });
            var newStudent = new Student(student);
            // newStudent.save().then(
            //     studentAuth.save().then(res => resolve(res)).catch(err => reject(err))
            // ).catch(reject("Error"));

            newStudent.save((error, studentData) => {
                if (error) {
                    reject(error)
                }
                else {
                    newStudentAuth.save((err, loginData) => {
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

studentPromises().then((res)=>{
    console.log("students added!",JSON.stringify(res));
}).catch( (err) => {
    console.log("Error: ",JSON.stringify(err));
})
console.log("Finished!");
// 