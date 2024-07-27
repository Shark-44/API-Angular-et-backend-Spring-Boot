import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isAdminLoggedIn$ = this.isAdminLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { headers, withCredentials: true })
      .pipe(
        tap(response => {
          if (response.success) {
            this.isAdminLoggedInSubject.next(true);
          }
        })
      );
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAdminLoggedInSubject.next(false);
        })
      );
  }
}
