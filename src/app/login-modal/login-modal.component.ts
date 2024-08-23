import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  standalone: true,  
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService
  ) {}

  submit() {
    this.http.post('http://192.168.1.157:8080/login', 
      { username: this.username, password: this.password }, 
      { withCredentials: true,
        responseType: 'text'  }
    ).subscribe(
      (response: string) => {  // Typage explicite en tant que string
        console.log('Token reçu:', response);
        this.authService.setLoggedIn(true);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Erreur de connexion', error);
      }
    );
  }
}
