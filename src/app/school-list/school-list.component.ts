import { Component, OnInit } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbPopoverModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SchoolService} from '../services/school.service';
import { School } from '../models/school.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [NgIf, NgForOf, CommonModule, NgbPopoverModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent implements OnInit {
  listSchool: School[] = [];
  showDelete: boolean = false;
  showManage: boolean = false;
  showCreate: boolean = false;
  openPopoverId: number | null = null;
  isAdminLoggedIn: boolean = false;
  
  nameSchool: string = '';
  selectedFile: File | null = null;
  photoSchool: string = '';

  constructor(
    private schoolService: SchoolService, 
    private router: Router,
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSchools();
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isAdminLoggedIn = isLoggedIn;
    });
  }

  fetchSchools(): void {
    this.schoolService.getSchools().subscribe((schools: School[]) => {
      this.listSchool = schools;
    });
  }
  getLangageNames(school: School): string {
    return school.langages.map(langage => langage.nameLangage).join(', ');
  }

  // creation d'une école
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
    const schoolData = {
      nameSchool: this.nameSchool,
      photoSchool: photoFileName
    };

    this.http.post('http://localhost:8080/api/schools', schoolData, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).subscribe({
      next: (response) => {
        console.log('Student created:', response);
        this.resetForm();
        this.fetchSchools(); 
        this.showCreate = false;
      },
      error: (error) => {
        console.error('Error creating student:', error);
      }
    });
  }
  resetForm() {
    this.nameSchool = '';
    this.selectedFile = null;
  }

   // fonction des boutons
  toggleShowCreateSchool() {
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

  toggleWithGreeting(popover: NgbPopover, context: { greeting: string }) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open(context);
    }
  }
  navigateToManageSchool(id: number) {
    this.router.navigate(['/ManageSchool', id]);
  }
  handleDelSchool(id: number) {
    this.schoolService.deleteSchool(id).subscribe({
      next: () => {
        this.listSchool = this.listSchool.filter(school => school.idSchool !== id);
        alert('École supprimé avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'école :', err);
        alert('Erreur lors de la suppression de l\'école.');
      }
    });
  }
}
