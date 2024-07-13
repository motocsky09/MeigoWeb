import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false; // Variabila pentru a controla afișarea sidebar-ului

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void { }

  isLog(): boolean {
    return this.service.isLogged();
  }

  onLogout(): void {
    this.service.logout();
    this.router.navigate(['/user/login']);
    this.isSidebarOpen = false; // Închide sidebar-ul după deconectare
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; // Comută starea sidebar-ului
  }
}
