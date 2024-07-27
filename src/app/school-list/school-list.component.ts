import { Component } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [NgIf, NgForOf, CommonModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent {

}
