// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { LanguageListComponent } from './language-list/language-list.component';
import {ManageStudentComponent} from "./manage-student/manage-student.component";
import {ManageSchoolComponent} from "./manage-school/manage-school.component";
import {ResultComponent} from './result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'schools', component: SchoolListComponent },
  { path: 'languages', component: LanguageListComponent },
  { path: 'ManageStudent/:id', component: ManageStudentComponent },
  { path: 'ManageSchool/:id', component: ManageSchoolComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }