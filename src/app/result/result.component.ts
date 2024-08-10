import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../services/school.service";
import { NotationService } from "../services/notation.service";
import { School } from "../models/school.model";
import { Student } from "../models/student.model";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

export interface StudentAverage {
    studentId: number;
    studentName: string;
    average: number;
  }

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [
        NgForOf,
        CommonModule,
        NgbPopoverModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        FormsModule
    ],
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    listSchool: School[] = [];
    selectSchool: number | undefined;
    studentAverages: StudentAverage[] = [];

    constructor(
        private schoolService: SchoolService,
        private notationService: NotationService
    ) {}

    ngOnInit(): void {
        this.fetchSchools();
    }

    fetchSchools(): void {
        this.schoolService.getSchools().subscribe((schools: School[]) => {
          this.listSchool = schools;
        });
    }

    onSchoolSelect(schoolId: number): void {
        console.log('Selected school ID:', schoolId);
        this.fetchStudentAverages(schoolId);
    }

    fetchStudentAverages(schoolId: number): void {
        this.notationService.getAverageBySchool(schoolId).subscribe(
          (averages: StudentAverage[]) => {
            this.studentAverages = averages;
            console.log('Student averages:', this.studentAverages);
          },
          (error) => {
            console.error('Error fetching student averages:', error);
          }
        );
      }
    }