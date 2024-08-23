import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { School } from '../models/school.model';
import { SchoolService } from '../services/school.service';
import { Langage } from '../models/school.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
    NgFor,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule, 
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ],
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {
  imageUrl = environment.imageUrl;
  name: string = '';
  firstname: string = '';
  selectedFile: File | null = null;
  photo: string = '';
  birthday: Date | null = null; 
  listSchool: School[] = [];
  favoriteSchool: number | null | undefined = undefined;
  listLangage: Langage[] = [];
  selectedLangageIds: number[] = [];
  isEnrolledInSchool: boolean = false;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadStudentData(id);
        this.fetchSchools();
      }
    });
  }

  loadStudentData(id: number) {
    this.http.get(`${environment.apiUrl}/students/${id}`).subscribe({
      next: (student: any) => {
        this.name = student.name;
        this.firstname = student.firstname;
        this.birthday = new Date(student.birthday);
        this.photo = student.photo;
        
        if (student.schoolId) {
          // L'étudiant est inscrit dans une école
          this.isEnrolledInSchool = true;
          this.favoriteSchool = student.schoolId;
          this.fetchSchools();
          this.fetchSchoolLangages(this.favoriteSchool);
        } else {
          // L'étudiant n'est pas inscrit dans une école
          this.isEnrolledInSchool = false;
          this.favoriteSchool = null;
          this.fetchSchools();
        }
        
        // Chargement des langages de l'étudiant
        this.selectedLangageIds = student.langages.map((lang: any) => lang.idLangage);
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
      this.http.post(`${environment.apiUrl}/files/upload`, formData, {
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
      this.http.put(`${environment.apiUrl}/students/${id}/basic-info`, studentData, {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).subscribe({
        next: (response) => {
          console.log('Student updated:', response);
        },
        error: (error) => {
          console.error('Error updating student:', error);
        }
      });
    });
  }

  fetchSchools(): void {
    this.schoolService.getSchools().subscribe((schools: School[]) => {
      this.listSchool = schools;
    });
  }

  onSchoolSubmit() {
    if (this.favoriteSchool != null) {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.http.put(`${environment.apiUrl}/students/${id}/associate-school/${this.favoriteSchool}`, {})
          .subscribe({
            next: (response) => {
              console.log('School associated:', response);
              this.isEnrolledInSchool = true;
              this.fetchSchoolLangages(this.favoriteSchool!);
            },
            error: (error) => {
              console.error('Error associating school:', error);
            }
          });
      });
    } else {
      console.error('No school selected or invalid student ID');
    }
  }

  fetchSchoolLangages(schoolId: number | null | undefined) {
    if (schoolId != null) {
      this.http.get<Langage[]>(`${environment.apiUrl}/schools/${schoolId}/langages`)
        .subscribe({
          next: (data) => {
            this.listLangage = data;
          },
          error: (error) => {
            console.error('Error fetching langages:', error);
          }
        });
    }
  }

  handleLangageChange(langageId: number) {
    if (this.selectedLangageIds.includes(langageId)) {
      this.selectedLangageIds = this.selectedLangageIds.filter(id => id !== langageId);
    } else {
      this.selectedLangageIds.push(langageId);
    }
  }

  handleLangageSubmit() {
    if (this.selectedLangageIds.length > 0 && this.favoriteSchool != null) {
      let httpParams = new HttpParams();
      this.selectedLangageIds.forEach(langageId => {
        httpParams = httpParams.append('langageIds', langageId.toString());
      });
      httpParams = httpParams.append('schoolId', this.favoriteSchool.toString());
  
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.http.put(`${environment.apiUrl}/students/${id}/associate-langages`, null, { params: httpParams })
          .subscribe({
            next: (response) => {
              console.log('Langages associés:', response);
            },
            error: (error) => {
              console.error('Erreur lors de l\'association des langages:', error);
            }
          });
      });
    } else {
      console.error('Aucun langage sélectionné ou étudiant non inscrit dans une école');
    }
  }
  getCurrentSchoolName(): string {
    const school = this.listSchool.find(s => s.idSchool === this.favoriteSchool);
    return school ? school.nameSchool : 'Non spécifié';
  }
  
  changeSchool() {
    this.isEnrolledInSchool = false;
    this.favoriteSchool = null;
  }
  
  isLangageSelected(langageId: number): boolean {
    return this.selectedLangageIds.includes(langageId);
  }
}
