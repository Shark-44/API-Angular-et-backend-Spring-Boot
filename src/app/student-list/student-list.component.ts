import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.listStudent = students;
    });
  }

  handleDelStudent(idStudent: number): void {
    // Logic to delete the student
  }

  togglePopover(studentId: number): void {
    if (this.openPopoverId === studentId) {
      this.openPopoverId = null; // Ferme le popover s'il est déjà ouvert
    } else {
      this.openPopoverId = studentId; // Ouvre le popover pour cet étudiant
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
