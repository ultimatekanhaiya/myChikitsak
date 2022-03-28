import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userType = localStorage.getItem('userType');
  login = localStorage.getItem('id');
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.login + 'login data');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
