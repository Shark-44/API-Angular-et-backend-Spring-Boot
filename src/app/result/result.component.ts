import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../services/school.service";
import { NotationService } from "../services/notation.service";
import { LangageService } from "../services/langage.service";

import { School, NotationGroup, Langage, StudentAverage, StudentNotations } from "../models/models";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



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
    studentNotations: StudentNotations[] = [];
    langages: Langage[] = [];

    constructor(
        private schoolService: SchoolService,
        private notationService: NotationService,
        private langageService: LangageService

    ) {}

    ngOnInit(): void {
        this.fetchSchools();
        this.fetchLangages()
    }

    fetchSchools(): void {
        this.schoolService.getSchools().subscribe((schools: School[]) => {
          this.listSchool = schools;
        });
    }

    onSchoolSelect(schoolId: number): void {
        console.log('Selected school ID:', schoolId);
        this.fetchStudentAverages(schoolId);
        this.fetchStudentNotations(schoolId);
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
      // step 2
      fetchLangages(): void {
        this.langageService.getLangages().subscribe((langages: Langage[]) => {
          this.langages = langages;
        });
      }
    
    
      fetchStudentNotations(schoolId: number): void {
        this.notationService.getNotationsBySchoolId(schoolId).subscribe(
          (notationGroups: NotationGroup[]) => {
            this.processNotations(notationGroups);
          },
          (error) => {
            console.error('Error fetching student notations:', error);
          }
        );
      }

      processNotations(notationGroups: NotationGroup[]): void {
        const studentNotationsMap = new Map<number, StudentNotations>();
        const langagesSet = new Set<string>();
      
        notationGroups.forEach(group => {
          langagesSet.add(group.langageName);
      
          if (!studentNotationsMap.has(group.studentId)) {
            studentNotationsMap.set(group.studentId, {
              studentId: group.studentId,
              studentName: group.studentName,
              notations: {}
            });
          }
      
          const studentNotation = studentNotationsMap.get(group.studentId)!;
      
          if (!studentNotation.notations[group.langageName]) {
            studentNotation.notations[group.langageName] = [];
          }
      
          // Ajouter toutes les notes individuelles pour ce langage
          group.notes.forEach(note => {
            studentNotation.notations[group.langageName].push(note.note);
          });
        });
      
        this.studentNotations = Array.from(studentNotationsMap.values());
        this.langages = Array.from(langagesSet).map(name => ({ nameLangage: name, idLangage: 0 }));
      }
    }