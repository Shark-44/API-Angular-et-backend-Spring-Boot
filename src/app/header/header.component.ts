// header.component.ts
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class AppHeaderComponent implements OnInit {
  isAdminLoggedIn: boolean = false;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isAdminLoggedIn = loggedIn;
    });
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent);
    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.authService.setLoggedIn(true);
      }
    });
  }

  logout() {
    this.http.get(`${environment.apiUrl2}/logout`, { responseType: 'text'})
    .subscribe(
      (response: string) => {
        console.log('Réponse de déconnexion:', response);
        this.authService.setLoggedIn(false);
      },
      (error: any) => {
        console.error('Erreur de déconnexion:', error);
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
      }
    );
  }
}