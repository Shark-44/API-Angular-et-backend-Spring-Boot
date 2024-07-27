// src/app/models/student.model.ts
export interface Student {
    idStudent: number;
    name: string;
    firstname: string;
    birthday: Date;
    photo: string;
    langages: Langage[];
    showPopover?: boolean;
  }
  
  export interface Langage {
    idLangage: number;
    nameLangage: string;
  }
  