import { RecordVoiceOverRounded } from "@material-ui/icons";
import { Behavior, Datatype } from "@prisma/client";
import { ExecOptionsWithStringEncoding, SpawnSyncOptionsWithStringEncoding } from "child_process";
import React from "react";
import internal from "stream";

export interface Program {

}

export interface ProgramAsProps
{
  studentID: string;
  studentName: string;
  behaviors: Behavior[];
  responses: string[];
}

export interface Student {
    _id?: string;
    id: any,
    firstName: string,
    lastName: string,
    img?: string;
    program?: Program,
    dob: string,
    parentPhone: string,
    email?: string;
    parentEmail: string;
    otherInfo?: string;
    students?: Student[];
}

export interface ProgramAsProps
{
  studentID: string;
  studentName: string;
  behaviors: Behavior[];
  responses: string[];
}

export interface StudentProfileProps {
    student: Student;
}

export interface StudentSearchProps {
    students: Student[];
  }
  
export interface Employee {
    _id?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    patients?: string[];
    birthday?: Date;
    id?: string,
    dob?: string,
    phone?: string,
    email?:string,
    otherInfo?: string,
    program?: Program,
    img?: string,
}
  
export interface EmployeeProfileProps {
    students: any[];
    employee: Employee;
    currentStudent: any[];
}

export interface EmployeeSearchProps{
  employees: Employee[];
}
  
export interface Patient{
  firstName: string;
  lastName: string; 
  email: string;
  birthday;
  parentPhone: string;
  parentEmail: string;
}  

export interface AnalyticsProps {
  patient: any;
  reports: any[];
}

export interface AvatarProps {
  img?: string;
  diameter?: string;
}

export interface EmployeeWithIdAndImg extends Employee { 
  id: any; 
}


export interface Props {
  employee: EmployeeWithIdAndImg;
}

export interface OtherInfoProps {
  info: string;
}

export interface SearchListProps {
  students?: any;
  employees?: any;
  searchTerm: string;
  destinationPath: string;
}

export interface StudentListItemProps {
  firstName: string;
  lastName: string;
  id: any;
  img?: string;
  destinationPath: string;
}

export interface ReportsProps{
  reports: any[];
}

export interface BehaviorAddSessionProps {
  behaviorCount?: number;
  data?: {
    title: string;
    description: string;
    datatype: 'probe' | 'trial' | 'duration' | 'frequency' ;
    trialsPerEntry?: number;
    entries?: string[];
    tags?: string[];
  };
  returnData?: (behaviorCount: number, responses: any[]) => void;
}

export interface BehaviorEditProgramProps {
  list: BehaviorItem[];
  studentId: number;
  updateBehaviorList: (updatedlist: any) => void;
}

export interface BehaviorItem {
  id: string | number;
  name: string;
  description: string;
  type: string;
  domain: string[];
  masteryCriteria: string;
  mastered: boolean;
  datatype?: string;
}

export interface BehaviorsProps {
  behaviors: any[];
  returnResponses?: (responses: any[]) => void;
}

export interface BehaviorDialogFormProps {
  behavior: Behavior,
  setBehavior: (behavior: any) => void;
}

export interface MyAppProps {
  Component: React.ElementType;
  pageProps: Record<string, unknown>;
}

export interface MyDocumentProps {
  styles: React.ReactElement[];
}

export interface DurationInputProps {
  title: string;
  trialsPerEntry: number;
  entryNumber: number;
  setResponses: (time: number, entryNumber: number) => void;
}

export interface FrequencyInputProps {
  title: string;
  entryNumber: number;
  setResponses?: (counter: number, entryNumber: number) => void;
}

export interface ProbeInputProps {
  title: string;
  trialsPerEntry: number;
  entryNumber: number;
  setResponses?: (checkedData: string[], entryNumber: number) => void;
}

export interface EditProgramProps {
  studentID: number;
  program: {
    behaviours: string[];
  };
}

export interface CurrentProps {
  studentID: number,
  addedBehavior: any[];
}

export interface ChipData {
  key: number;
  label: string;
}

export interface GenInfoProps {
  globalBehavior: Behavior[];
  behaviorId: string;
  setBehaviorId: (id: string) => void;
  updateBehavior: (id: string) => void;
}

export interface MasteredProps {
  studentID: string,
}

export interface IndexProps {
  patient: any;
  reports: any;
}