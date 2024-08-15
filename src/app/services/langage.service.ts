import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangageService{
    private apiUrl = 'http://localhost:8080/api/langages'
    constructor(private http: HttpClient) { }

    getLangages(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    deleteLangage(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url, { responseType: 'text' }); 
    }
}