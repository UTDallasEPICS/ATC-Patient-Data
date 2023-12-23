
// Behavior under editProgram

interface BehaviorProps {
    list: Behavior[];
    studentId: string;
    updateBehaviorList: (list: Behavior[]) => void;
  }
  
  interface Behavior {
    id: string;
    name: string;
    description: string;
    datatype: string;
  }

 
 // profile (under employee)

 interface Student 
{
  _id: string; 
  firstName: string; 
  lastName: string; 
} 

interface Employee 
{
  _id: string;
  firstName: string;
  lastName: string; 
  img: string; 
  birthday: string; 
  phoneNumber: string; 
  email: string; 
  otherInfo: string; 
}

