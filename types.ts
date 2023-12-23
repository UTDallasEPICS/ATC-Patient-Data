export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    img: string;
    dob: string;
    parentPhone: string;
    email: string;
    parentEmail: string;
    funder: string;
    otherInfo: string;
  }
export interface StudentProfileProps {
    student: Student;
}

export interface StudentSearchProps {
    students: Student[];
  }
  
export interface Employee {
    _id: string;
    img: string;
    firstName: string;
    lastName: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    otherInfo: string;
    patients: string[];
}
  
export interface EmployeeProfileProps {
    students: Student[];
    employee: Employee;
    currentStudent: Student[];
}
  
export default EmployeeProfileProps;
  
  