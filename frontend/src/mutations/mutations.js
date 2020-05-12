import { gql } from 'apollo-boost';

const loginStudent = gql`
    mutation loginStudent($Email: String!, $Password: String!){
        loginStudent(Email: $Email, Password: $Password){
            id
            Email
            FirstName
            LastName
        }
    }
`;

const loginEmployer = gql`
    mutation loginEmployer($Email: String!, $Password: String!){
        loginEmployer(Email: $Email, Password: $Password){
            id
            Email
            EmployerName
        }
    }
`;

const addJob = gql`
    mutation addJob($EmployerName: String, $EmployerID: String, $Postion: String, $Salary: Int,$Type: String,$PostDate: String, $Deadline: String, $City: String!, $State: String!, $Zipcode: String!, $Description: String!){
        addJob(
            EmployerName: $EmployerName,
            EmployerID: $EmployerID,
            Postion: $Postion,
            Salary: $Salary,
            Type: $Type,
            PostDate: $PostDate,
            Deadline: $Deadline,
            City: $City,
            State: $State,
            Zipcode: $Zipcode,
            Description: $Description,
    ){
        Postion
    }
}
`;
const addApplication = gql`
mutation addApplication($StudentID: String, $EmployerID: String, $JobID: String){
    addApplication(
        StudentID: $StudentID,
        EmployerID: $EmployerID,
        JobID: $JobID,
)
}
`;
export { loginStudent, loginEmployer, addJob, addApplication };