import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {NotationGroup, StudentAverage } from '../models/models';



@Injectable({
  providedIn: 'root'
})

export class NotationService {
  private apiUrl = 'http://localhost:8080/api/notations';

  constructor(private http: HttpClient) { }

  getAverageBySchool(schoolId: number): Observable<StudentAverage[]> {
    return this.http.get<StudentAverage[]>(`${this.apiUrl}/average/${schoolId}`);
  }

  getNotationsBySchoolId(schoolId: number): Observable<NotationGroup[]> {
    return this.http.get<NotationGroup[]>(`${this.apiUrl}/school/${schoolId}/notations`);
  }
}