// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import {ManageStudentComponent} from "./Manage/ManageStudentComponent.component"

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'schools', component: SchoolListComponent },
  { path: 'languages', component: LanguageListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'ManageStudent', component: ManageStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }