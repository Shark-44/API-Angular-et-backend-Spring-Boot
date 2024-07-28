// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getStoredLoginState());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isAdminLoggedIn', JSON.stringify(value));
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  private getStoredLoginState(): boolean {
    return JSON.parse(localStorage.getItem('isAdminLoggedIn') || 'false');
  }
}