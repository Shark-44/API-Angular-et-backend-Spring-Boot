import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

export interface StudentAverage {
  studentId: number;
  studentName: string;
  average: number;
}

@Injectable({
  providedIn: 'root'
})

export class NotationService {
  private apiUrl = 'http://localhost:8080/api/notations';

  constructor(private http: HttpClient) { }

  getAverageBySchool(schoolId: number): Observable<StudentAverage[]> {
    return this.http.get<StudentAverage[]>(`${this.apiUrl}/average/${schoolId}`);
  }
}