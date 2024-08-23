import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = `${environment.apiUrl}/schools`;

  constructor(private http: HttpClient) { }

  getSchools(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteSchool(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }); 
  }
}