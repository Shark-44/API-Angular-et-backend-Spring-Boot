// src/app/models/models.ts

export interface School {
    idSchool: number;
    nameSchool: string;
  }
  
  export interface Student {
    idStudent: number;
    nameStudent: string;
  }
  
  export interface Langage {
    idLangage?: number;
    nameLangage: string;
  }
  
  export interface Notation {
    idNotation: number;
    note: number;
    dateNote: Date;
    student: { idStudent: number; nameStudent: string };
    langage: { idLangage: number; nameLangage: string };
  }
  
  export interface StudentAverage {
    studentId: number;
    studentName: string;
    average: number;
  }
  
  export interface NotationGroup {
    studentId: number;
    studentName: string;
    langageName: string;
    notes: { note: number }[];
  }
  
  export interface StudentNotations {
    studentId: number;
    studentName: string;
    notations: { [key: string]: number[] };
  }