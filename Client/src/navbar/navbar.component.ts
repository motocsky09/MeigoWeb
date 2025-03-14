import { Component, OnInit, HostListener } from '@angular/core';
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

  // Verifică dacă utilizatorul este logat
  isLog(): boolean {
    return this.service.isLogged();
  }

  // Funcția de logout
  onLogout(): void {
    this.service.logout();
    this.router.navigate(['/user/login']);
    this.isSidebarOpen = false; // Închide sidebar-ul după deconectare
  }

  // Comută starea sidebar-ului
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; // Comută starea sidebar-ului
  }

  // Ascultă evenimentele de click pe document pentru a închide sidebar-ul
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const navRight = document.querySelector('.nav-right');
    if (this.isSidebarOpen && !sidebar?.contains(event.target as Node) && !navRight?.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }
}