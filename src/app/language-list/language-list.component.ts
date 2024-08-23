import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

import { Langage } from '../models/student.model';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-language-list',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.css'
})
export class LanguageListComponent implements OnInit {
Langages: Langage[] = []

constructor(
  private http: HttpClient
) {}

ngOnInit() {
  this.fetchLangages();
}

fetchLangages() {
  this.http.get<Langage[]>(`${environment.apiUrl}/langages`).subscribe({
    next: (data) => {
      this.Langages = data;
    },
    error: (error) => {
      console.error('Error fetching all langages:', error);
    }
  });
}
}
