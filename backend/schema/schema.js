const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLFloat,
} = graphql
const _ = require('lodash')
const bcrypt = require('bcrypt')

const StudentAuth = require('../models/student/StudentAuthModel');
const Student = require('../models/student/StudentModel');

const EmployerAuth = require('../models/employer/EmployerAuthModel');
const Employer = require('../models/employer/EmployerModel');

const Job = require('../models/job/JobModel');
const Application = require('../models/job/ApplicationModel');

const graphqlTypeJson = require('graphql-type-json')
const { GraphQLJSON } = graphqlTypeJson;


const StudentType = new GraphQLObjectType({
    name: "students",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        Email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        FirstName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        LastName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        PhoneNumber: {
            type: GraphQLString
        },
        CareerObjective: {
            type: GraphQLString
        },
        ProfileUrl: {
            type: GraphQLString
        },
        Educations: {
            type: EducationType,
        },
        Experiences: {
            type: ExperienceType,
        }
    })
});

const EducationType = new GraphQLObjectType({
    name: "eductions",
    fields: () => ({
        School: {
            type: (GraphQLString)
        },
        Major: {
            type: (GraphQLString)
        },
        Level: {
            type: (GraphQLString)
        },
        GradDate: {
            type: GraphQLString
        },
        GPA: {
            type: GraphQLFloat
        }
    })
});

const ExperienceType = new GraphQLObjectType({
    name: "experiences",
    fields: () => ({
        Employer: {
            type: GraphQLString
        },
        Title: {
            type: GraphQLString
        },
        Description: {
            type: GraphQLString
        },
        StartDate: {
            type: GraphQLString
        },
        EndDate: {
            type: GraphQLString
        }
    })
});

const StudentAuthType = new GraphQLObjectType({
    name: "studentAuth",
    fields: () => ({
        Email: {
            type: GraphQLString
        },
        Password: {
            type: GraphQLString
        },
    }),

});

const EmployerAuthType = new GraphQLObjectType({
    name: "employerAuth",
    fields: () => ({
        Email: {
            type: GraphQLString
        },
        Password: {
            type: GraphQLString
        },
    }),

});


const EmployerType = new GraphQLObjectType({
    name: "employers",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        Email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        EmployerName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        PhoneNumber: {
            type: GraphQLString
        },
        EmployerDescription: {
            type: GraphQLString
        },
        ProfileUrl: {
            type: GraphQLString
        },
        Address: {
            type: AddressType
        },

    })
});

const AddressType = new GraphQLObjectType({
    name: "address",
    fields: () => ({
        Street: {
            type: GraphQLString
        },
        Apt: {
            type: GraphQLString
        },
        City: {
            type: GraphQLString
        },
        State: {
            type: GraphQLString
        },
        Zipcode: {
            type: GraphQLString
        }
    })
});


const JobType = new GraphQLObjectType({
    name: "jobs",
    fields: () => ({
        EmployerID: {
            type: GraphQLString
        },
        EmployerName: {
            type: GraphQLString
        },
        Postion: {
            type: GraphQLString
        },
        Salary: {
            type: GraphQLInt
        },
        Type: {
            type: GraphQLString
        },
        PostDate: {
            type: GraphQLString
        },
        Deadline: {
            type: GraphQLString
        },
        Address: {
            type: AddressType
        },
        Description: {
            type: GraphQLString
        },
    })
});

const ApplicationType = new GraphQLObjectType({
    name: "application",
    fields: () => ({
        StudentID: {
            type: StudentType
        },
        JobID: {
            type: JobType
        },
        EmployerID: {
            type: EmployerType
        },
        Status: {
            type: GraphQLString
        },

    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        student: {
            type: StudentType,
            args: {
                id: {
                    type: GraphQLID
                },
                Email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("Id:",args.id)
                if(args.id){
                    return Student.findById(args.id)
                }else if(args.Email){
                    return Student.findOne({Email: args.Email})
                }  
            }
        },
        studentAuth: {
            type: StudentAuthType,
            args: {
                Email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return StudentAuth.findOne({ Email: args.Email })
            }
        },

        employer: {
            type: EmployerType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Employer.findById(args.id)
            }
        },

        employerAuth: {
            type: EmployerAuthType,
            args: {
                Email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return EmployerAuth.findOne({ Email: args.Email })
            }
        },

        job: {
            type: GraphQLList(JobType),
            args: {
                id: {
                    type: GraphQLID
                },
                EmployerID: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                console.log("--------------------Job:");
                if (args.id) {
                    return Job.find({ _id: args.id })
                } else if (args.EmployerID) {
                    return Job.find({ EmployerID: args.EmployerID });
                } else {
                    return Job.find({});
                }
            }
        },

        application: {
            type: GraphQLList(ApplicationType),
            args: {
                id: {
                    type: GraphQLID
                },
                JobID: {
                    type: GraphQLID
                },
                StudentID: {
                    type: GraphQLID
                },
                EmployerID: {
                    type: GraphQLID
                },

            },
            resolve(parent, args) {
                if (args.id) {
                    return Application.find({ _id: args.id }).populate('JobID').populate('StudentID').populate('EmployerID')
                } else if (args.JobID) {
                    return Application.find({ JobID: args.JobID }).populate('JobID').populate('StudentID').populate('EmployerID')
                } else if (args.StudentID) {
                    console.log("Application Student",args.StudentID)
                    return Application.find({ StudentID: args.StudentID }).populate('JobID').populate('StudentID').populate('EmployerID')
                } else if (args.EmployerID) {
                    return Application.find({ EmployerID: args.EmployerID }).populate('JobID').populate('StudentID').populate('EmployerID')
                }
            }
        },

        allStudents: {
            type: GraphQLList(StudentType),
            args: {
                Name: { 
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                condition = { $or: [{ FirstName: { $regex: '.*' + args.Name + '.*' } }, 
                { LastName: { $regex: '.*' + args.Name + '.*' } },
                { "Educations.School": { $regex: '.*' + args.Name + '.*' } }] };
                if(args.Name){
                    return Student.find(condition);
                }else{
                    return Student.find();
                }
                
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUpEmployer: {
            type: GraphQLString,
            args: {
                Email: { type: GraphQLString },
                Password: { type: GraphQLString },
                EmployerName: { type: GraphQLString },
                Street: { type: GraphQLString },
                Apt: { type: GraphQLString },
                City: { type: GraphQLString },
                State: { type: GraphQLString },
                Zipcode: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const address = {
                    Street: args.Street,
                    Apt: args.Apt,
                    City: args.City,
                    State: args.State,
                    Zipcode: args.Zipcode,
                };

                var newEmployer = new Employer({
                    Email: args.Email,
                    EmployerName: args.EmployerName,
                    Address: address,
                });
                var newEmployerAuth = new EmployerAuth({
                    Email: args.Email,
                    Password: bcrypt.hashSync(args.Password, 10),
                })

                var result = await Employer.findOne({ "Email": newEmployer.Email }, (error, employer) => {
                    if (error) {
                        return "User Already exists"
                    }
                    if (employer) {
                        console.log("Employer: ", JSON.stringify(employer));
                        return "User Already exists"
                    }
                    else {
                        newEmployer.save((error, employerData) => {
                            if (error) {
                                return "User Already exists"
                            }
                            else {
                                newEmployerAuth.save((err, loginData) => {
                                    if (err) {
                                        return "User Already exists"
                                    }
                                    else {
                                        console.log("signup successful");
                                        // callback(null, loginData);
                                        return "Success"
                                    }
                                })
                            }
                        });
                    }
                });
                console.log("result: ", JSON.stringify(result));
                if (result) {
                    return "Failed";
                } else {
                    return "Success";
                }
            }
        },

        signUpStudent: {
            type: GraphQLString,
            args: {
                Email: { type: GraphQLString },
                Password: { type: GraphQLString },
                FirstName: { type: GraphQLString },
                LastName: { type: GraphQLString },
                School: { type: GraphQLString },
                Major: { type: GraphQLString },
                Level: { type: GraphQLString },
                GradDate: { type: GraphQLString },
            },
            async resolve(parent, args) {
                var education = {
                    School: args.School,
                    Major: args.Major,
                    Level: args.Level,
                    GradDate: new Date(args.GradDate),
                };
                var newStudent = new Student({
                    Email: args.Email,
                    FirstName: args.FirstName,
                    LastName: args.LastName,
                    Educations: education,
                });
                var newStudentAuth = new StudentAuth({
                    Email: args.Email,
                    Password: bcrypt.hashSync(args.Password, 10),
                })

                var result = await Student.findOne({ "Email": newStudent.Email }, (error, student) => {
                    if (error) {
                        return "Student already exists", "Student already exists";
                    }
                    if (student) {
                        return "User Already exists"
                    }
                    else {
                        newStudent.save((error, studentData) => {
                            if (error) {
                                return "User Already exists"
                            }
                            else {
                                newStudentAuth.save((err, loginData) => {
                                    if (err) {
                                        return "User Already exists"
                                    }
                                    else {
                                        return "Success"
                                    }
                                })
                            }
                        });
                    }
                });
                console.log("result: ", JSON.stringify(result));
                if (result) {
                    return "Failed";
                } else {
                    return "Success";
                }
            }
        },

        addJob: {
            type: JobType,
            args: {
                EmployerName: { type: GraphQLString },
                EmployerID: { type: GraphQLString },
                Postion: { type: GraphQLString },
                Salary: { type: GraphQLInt },
                Type: { type: GraphQLString },
                PostDate: { type: GraphQLString },
                Deadline: { type: GraphQLString },
                City: { type: GraphQLString },
                State: { type: GraphQLString },
                Zipcode: { type: GraphQLString },
                Description: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args)
                var address = {
                    City: args.City,
                    State: args.State,
                    Zipcode: args.Zipcode,
                };

                var newJob = new Job({
                    EmployerID: args.EmployerID,
                    EmployerName: args.EmployerName,
                    Postion: args.Postion,
                    Salary: args.Salary,
                    Type: args.Type,
                    PostDate: new Date(),
                    Deadline: new Date(),
                    Address: address,
                    Description: args.Description
                });

                var result = await newJob.save();

                console.log("result: ", JSON.stringify(result));
                if (!result) {
                    return "Failed";
                } else {
                    return "Success";
                }
            }
        },

        updateJob: {
            type: JobType,
            args: {
                id: { type: GraphQLID },
                EmployerName: { type: GraphQLString },
                Postion: { type: GraphQLString },
                Salary: { type: GraphQLInt },
                Type: { type: GraphQLString },
                PostDate: { type: GraphQLString },
                Deadline: { type: GraphQLString },
                Address: { type: GraphQLJSON },
                Description: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args)
                var job = await Job.findByIdAndUpdate(args.id, {
                    $set: {
                        EmployerName: args.EmployerName,
                        Postion: args.Postion,
                        Salary: args.Salary,
                        Type: args.Type,
                        PostDate: args.PostDate,
                        Deadline: args.Deadline,
                        Address: args.Address,
                        Description: args.Description,
                    }
                }).exec()
                if (job && job.length != 0) {
                    return "Successfully Updated"
                }
            }
        },

        loginStudent: {
            type: StudentType,
            args: {
                Email: { type: GraphQLString },
                Password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var result = null
                var user = await StudentAuth.findOne({
                    Email: args.Email
                }).exec()
                if (user && user.length != 0) {
                    if (bcrypt.compareSync(args.Password, user.Password)) {
                        await   Student.findOne({Email: args.Email},(err,res)=>{
                            result=res;
                        })
                    }
                }
                return result
            }
        },


        loginEmployer: {
            type: EmployerType,
            args: {
                Email: { type: GraphQLString },
                Password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var result = null
                var user = await EmployerAuth.findOne({
                    Email: args.Email
                }).exec()
                if (user && user.length != 0) {
                    if (bcrypt.compareSync(args.Password, user.Password)) {
                        await   Employer.findOne({Email: args.Email},(err,res)=>{
                            result=res;
                        })
                    }
                }
                return result
            }
        },

        editStudentDetails: {
            type: StudentType,
            args: {
                id: { type: GraphQLID },
                FirstName: { type: GraphQLString },
                LastName: { type: GraphQLString },
                PhoneNumber: { type: GraphQLString },
                CareerObjective: { type: GraphQLString },
                Educations: { type: GraphQLJSON },
                Experiences: { type: GraphQLJSON },
            },
            async resolve(parent, args) {
                console.log(args)
                var student = await Student.findByIdAndUpdate(args.id, {
                    $set: {
                        FirstName: args.FirstName,
                        LastName: args.LastName,
                        PhoneNumber: args.PhoneNumber,
                        CareerObjective: args.CareerObjective,
                        Educations: args.Educations,
                        Experiences: args.Experiences,
                    }
                }).exec()
                if (student && student.length != 0) {
                    return "Successfully Updated"
                }
            }
        },

        editEmployerDetails: {
            type: EmployerType,
            args: {
                id: { type: GraphQLID },
                EmployerName: { type: GraphQLString },
                PhoneNumber: { type: GraphQLString },
                EmployerDescription: { type: GraphQLString },
                Address: { type: GraphQLJSON },

            },
            async resolve(parent, args) {
                console.log(args)
                var employer = await Employer.findByIdAndUpdate(args.id, {
                    $set: {
                        EmployerName: args.FirstName,
                        PhoneNumber: args.PhoneNumber,
                        EmployerDescription: args.EmployerDescription,
                        Address: args.Address,
                    }
                })
                if (employer) {
                    return "Successfully Updated"
                }
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})