import { gql } from 'apollo-boost';

const getStudentDetailsQuery = gql`
query($id: ID!) {
    student(id: $id) {
        FirstName
        LastName
        Email
        PhoneNumber
        CareerObjective
        Educations{
            School
            Major
            Level
            GradDate
            GPA
        }
        Experiences{
            Title
            Employer
            Description
            EndDate
            StartDate
        }
    }
}`;

const getEmployerDetailsQuery = gql`
query($id: ID!) {
    employer(id: $id) {
        EmployerName
        Email
        EmployerDescription
        Address{
        City
        State
        Apt
        Street
        State
        }
    }
}`;

const getAllStudentQuery = gql`
query($Name: String!) {
    allStudents(Name: $Name) {
        id
        FirstName
        LastName
        Educations{
            School
            Major
            Level
        }
        Experiences{
            Employer
        }

    }
}
`;

const getJobsQuery = gql`
query($EmployerID: String!){
    job(EmployerID: $EmployerID){
        id
        EmployerID
        EmployerName
        Postion
        Type
        Salary
        Description
        PostDate
        Deadline
        Address{
          City
          State
          Zipcode
        }
       } 
}`;

const getApplicationsQuery = gql`
query($EmployerID: ID, $StudentID: ID){
    application(EmployerID: $EmployerID, StudentID: $StudentID){
        JobID {
            Postion
            Type
            Address{
              City
              State
            }
          }
          StudentID {
            id
            FirstName
            LastName
          }
          EmployerID{
            id
            EmployerName
          }

    }
}
`;
export { getAllStudentQuery, getStudentDetailsQuery, getJobsQuery, getApplicationsQuery, getEmployerDetailsQuery};