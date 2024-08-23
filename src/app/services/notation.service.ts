import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {NotationGroup, StudentAverage } from '../models/models';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class NotationService {
  private apiUrl = `${environment.apiUrl}/notations`;

  constructor(private http: HttpClient) { }

  getAverageBySchool(schoolId: number): Observable<StudentAverage[]> {
    return this.http.get<StudentAverage[]>(`${this.apiUrl}/average/${schoolId}`);
  }

  getNotationsBySchoolId(schoolId: number): Observable<NotationGroup[]> {
    return this.http.get<NotationGroup[]>(`${this.apiUrl}/school/${schoolId}/notations`);
  }
}