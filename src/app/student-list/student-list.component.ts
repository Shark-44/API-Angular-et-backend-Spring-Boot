import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { NgbPopoverModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgForm, FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-student-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgIf, NgForOf, CommonModule, NgbPopoverModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  imageUrl = environment.imageUrl;
  listStudent: Student[] = [];
  showDelete: boolean = false;
  showManage: boolean = false;
  showCreate: boolean = false;
  openPopoverId: number | null = null;
  isAdminLoggedIn: boolean = false;
  idStudent: number | null = null;

  // Pour la création d'un student
  name: string = '';
  firstname: string = '';
  selectedFile: File | null = null;
  photo: string = '';
  birthday: Date | null = null; 

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isAdminLoggedIn = isLoggedIn;
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

      this.http.post(`${environment.apiUrl}/files/upload`, formData, {
        headers: { 'Accept': 'application/json' },
        responseType: 'text', 
      }).subscribe({
        next: (response: string) => {
          // Extraire le nom du fichier de la réponse texte
          const photoFileName = response.split('File uploaded successfully: ')[1];
          this.createStudent(photoFileName);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
    } else {
      this.createStudent(null);
    }
  }

  createStudent(photoFileName: string | null) {
    const studentData = {
      name: this.name,
      firstname: this.firstname,
      birthday: this.birthday, // Assurez-vous que 'birthday' est bien du type Date ou string
      photo: photoFileName
    };

    this.http.post(`${environment.apiUrl}/students`, studentData, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).subscribe({
      next: (response) => {
        console.log('Student created:', response);
        this.resetForm();
        this.fetchStudents(); 
        this.showCreate = false;
      },
      error: (error) => {
        console.error('Error creating student:', error);
      }
    });
  }

  resetForm() {
    this.name = '';
    this.firstname = '';
    this.birthday = null;
    this.selectedFile = null;
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.listStudent = students;
    });
  }

  getLangageNames(student: Student): string {
    return student.langages.map(langage => langage.nameLangage).join(', ');
  }

  handleDelStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.listStudent = this.listStudent.filter(student => student.idStudent !== id);
        alert('Étudiant supprimé avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'étudiant :', err);
        alert('Erreur lors de la suppression de l\'étudiant.');
      }
    });
  }

  toggleShowCreateStudent() {
    this.showCreate = !this.showCreate;
    this.showDelete = false;
    this.showManage = false;
  }

  toggleShowManage() {
    this.showManage = !this.showManage;
    this.showCreate = false;
    this.showDelete = false;
  }

  toggleShowDelete() {
    this.showDelete = !this.showDelete;
    this.showCreate = false;
    this.showManage = false;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  toggleWithGreeting(popover: NgbPopover, context: { anniversaire: Date, greeting: string }) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open(context);
    }
  }
  navigateToManageStudent(id: number) {
    this.router.navigate(['/ManageStudent', id]);
  }
}
