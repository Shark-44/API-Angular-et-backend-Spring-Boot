import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  langagePath: string = './assets/images/langage.png';
  schoolPath: string = './assets/images/school.png';
  studentPath: string = './assets/images/student.png'
}
