// src/app/models/school.model.ts
export interface School {
    idSchool: number;
    nameSchool: string;
    photoSchool: string;
    langages: Langage[];
  
  }
  
  export interface Langage {
    idLangage: number;
    nameLangage: string;
  }