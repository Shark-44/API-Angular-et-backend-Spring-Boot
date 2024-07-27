import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class AppHeaderComponent {
  isAdminLoggedIn: boolean = false;

  login() {
    this.isAdminLoggedIn = true;
  }

  logout() {
    this.isAdminLoggedIn = false;
  }
}
