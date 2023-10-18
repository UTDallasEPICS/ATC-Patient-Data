export interface Program {}

export interface Student {
  firstName: string;
  lastName: string;
  id: string;
  birthday: Date;
  phone?: string;
  email?: string;
  otherInfo?: string;
  program?: Program;
  img?: ImageBitmap;
}

export interface Employee {
  firstName: string;
  lastName: string;
  id: string;
  birthday: Date;
  phone?: string;
  email?: string;
  otherInfo?: string;
  program?: Program;
  img?: ImageBitmap;
}
