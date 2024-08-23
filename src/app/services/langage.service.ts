import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangageService{
    private apiUrl = `${environment.apiUrl}/langages`;
    constructor(private http: HttpClient) { }

    getLangages(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    deleteLangage(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url, { responseType: 'text' }); 
    }
}