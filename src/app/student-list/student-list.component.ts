import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgIf, NgForOf, CommonModule, NgbPopoverModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudent: Student[] = [];
  showDelete: boolean = false;
  showManage: boolean = false;
  openPopoverId: number | null = null;
  isAdminLoggedIn: boolean = false;

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isAdminLoggedIn = isLoggedIn;
    });
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.listStudent = students;
    });
  }

  handleDelStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        // Supprimer l'étudiant de la liste locale
        this.listStudent = this.listStudent.filter(student => student.idStudent !== id);
        // Afficher une notification de succès
        alert('Étudiant supprimé avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'étudiant :', err);
        alert('Erreur lors de la suppression de l\'étudiant.');
      }
    });
  }
  
  createStudent() {
    // Logique pour créer un étudiant
  }

  toggleShowManage() {
    this.showManage = !this.showManage;
    this.showDelete = false;
  }

  toggleShowDelete() {
    this.showDelete = !this.showDelete;
    this.showManage = false;
  }
  togglePopover(studentId: number): void {
    if (this.openPopoverId === studentId) {
      this.openPopoverId = null; 
    } else {
      this.openPopoverId = studentId; 
    }
  }

  isPopoverOpen(studentId: number): boolean {
    return this.openPopoverId === studentId;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  getLangageNames(student: Student): string {
    return student.langages.map(langage => langage.nameLangage).join(', ');
  }
  toggleWithGreeting(popover: NgbPopover, context: { anniversaire: Date, greeting: string }) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open(context);
    }
  }
}
