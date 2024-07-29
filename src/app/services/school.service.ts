import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = 'http://localhost:8080/api/schools';

  constructor(private http: HttpClient) { }

  getSchools(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteSchool(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { responseType: 'text' }); 
  }
}