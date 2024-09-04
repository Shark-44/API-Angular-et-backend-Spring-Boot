import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment'; 

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  standalone: true,  
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginModalComponent {
  loginForm: FormGroup;
  hidePassword = true;

  
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }



  submit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
    this.http.post(`${environment.apiUrl2}/login`, 
    { username: formValues.username, password: formValues.password }, 
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
}