import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';

import { SchoolService } from '../services/school.service';
import { Langage } from '../models/school.model';
import { environment } from '../environments/environment';



@Component({
  selector: 'app-manage-school',
  standalone: true,
  imports: [ NgIf, NgFor, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatOptionModule,],
  templateUrl: './manage-school.component.html',
  styleUrl: './manage-school.component.css'
})
export class ManageSchoolComponent implements OnInit {
  imageUrl = environment.imageUrl;
  nameSchool: string = '';
  photoSchool: string = '';
  IdSchool: number | null = null;
  selectedFile: File | null = null;
  allLangages: Langage[] = [];
  associatedLangages: Langage[] = [];
  selectedLangages: number[] = [];
  newLangageName: string = '';
  

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadSchoolData(id);
        this.fetchSchoolLangages(id);
        this.fetchAllLangages();
      }
    });
  }

  loadSchoolData(id: number) {
    this.IdSchool =id;
    this.http.get(`${environment.apiUrl}/schools/${id}`).subscribe({
      next: (school: any) => {
        this.nameSchool = school.nameSchool;
        this.photoSchool = school.photoSchool;
        },
      error: (error) => {
        console.error('Error loading school data:', error);
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
      this.http.post(`${environment.apiUrl}/api/files/upload`, formData, {
        headers: { 'Accept': 'application/json' },
        responseType: 'text',
      }).subscribe({
        next: (response: string) => {
          const photoFileName = response.split('File uploaded successfully: ')[1];
          this.updateSchool(photoFileName);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
    } else {
      this.updateSchool(this.photoSchool);
    }
  }
  updateSchool(photoFileName: string | null) {
    if (this.IdSchool === null) {
      console.error('School ID is missing');
      return;
    }
  
    const schoolData = {
      nameSchool: this.nameSchool,
      photoSchool: photoFileName
    };
  
    this.http.put(`${environment.apiUrl}/schools/${this.IdSchool}`, schoolData, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).subscribe({
      next: (response) => {
        console.log('School updated:', response);
      },
      error: (error) => {
        console.error('Error updating school:', error);
      }
    });
  }
  // Partie langage associé ou non + ajout

  fetchAllLangages() {
    this.http.get<Langage[]>(`${environment.apiUrl}/langages`).subscribe({
      next: (data) => {
        this.allLangages = data;
      },
      error: (error) => {
        console.error('Error fetching all langages:', error);
      }
    });
  }

  fetchSchoolLangages(id: number) {
    this.http.get<Langage[]>(`${environment.apiUrl}/schools/${id}/langages`).subscribe({
      next: (data) => {
        this.associatedLangages = data;
      },
      error: (error) => {
        console.error('Error fetching school langages:', error);
      }
    });
  }


  associateLangages() {
    if (this.IdSchool === null) {
      console.error('School ID is missing');
      return;
    }

    this.http.put(`${environment.apiUrl}/schools/${this.IdSchool}/associate-langages`, this.selectedLangages, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).subscribe({
      next: (response) => {
        console.log('Langages associated:', response);
        this.fetchSchoolLangages(this.IdSchool!);
      },
      error: (error) => {
        console.error('Error associating langages:', error);
      }
    });
  }
  addNewLangage() {
    if (!this.newLangageName.trim()) {
      console.error('New langage name is empty');
      return;
    }

    this.http.post<Langage>(`${environment.apiUrl}/langages`, { name: this.newLangageName }, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).subscribe({
      next: (newLangage) => {
        console.log('New langage added:', newLangage);
        this.allLangages.push(newLangage);
        this.newLangageName = '';
        // Optionally, you can automatically associate the new langage with the school
        this.selectedLangages.push(newLangage.idLangage);
        this.associateLangages();
      },
      error: (error) => {
        console.error('Error adding new langage:', error);
      }
    });
  }
}
