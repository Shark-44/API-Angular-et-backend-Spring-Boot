import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
     MatFormFieldModule, 
     MatInputModule,
     MatDatepickerModule, 
     FormsModule],
  
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.css'
})
export class ManageStudentComponent implements OnInit {
  name: string = '';
  firstname: string = '';
  selectedFile: File | null = null;
  photo: string = '';
  birthday: Date | null = null; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Le '+' convertit la chaîne en nombre
      if (id) {
        this.loadStudentData(id);
      }
    });
  }

  loadStudentData(id: number) {
    this.http.get(`http://localhost:8080/api/students/${id}`).subscribe({
      next: (student: any) => {
        this.name = student.name;
        this.firstname = student.firstname;
        this.birthday = new Date(student.birthday);
        this.photo = student.photo;
      },
      error: (error) => {
        console.error('Error loading student data:', error);
      }
    });
  }
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }


    onSubmit(form: NgForm) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post('http://localhost:8080/api/files/upload', formData, {
          headers: { 'Accept': 'application/json' },
          responseType: 'text',
        }).subscribe({
          next: (response: string) => {
            const photoFileName = response.split('File uploaded successfully: ')[1];
            this.updateStudent(photoFileName);
          },
          error: (error) => {
            console.error('Error uploading file:', error);
          }
        });
      } else {
        this.updateStudent(null);
      }
    }
    
    updateStudent(photoFileName: string | null) {
      const studentData = {
        name: this.name,
        firstname: this.firstname,
        birthday: this.birthday,
        photo: photoFileName || this.photo // Utilise la nouvelle photo si uploadée, sinon garde l'ancienne
      };
    
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.http.put(`http://localhost:8080/api/students/${id}/basic-info`, studentData, {
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).subscribe({
          next: (response) => {
            console.log('Student updated:', response);
            // Ajoutez ici une logique pour rediriger ou afficher un message de succès
          },
          error: (error) => {
            console.error('Error updating student:', error);
          }
        });
      });
    }
}
