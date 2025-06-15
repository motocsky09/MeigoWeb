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
  user: any = null;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.isLog()) {
      // Forțează reîncărcarea userProfile dacă tokenul s-a schimbat
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('userProfile');
      let userProfile: any = null;
      if (userStr) {
        try {
          userProfile = JSON.parse(userStr);
        } catch {
          userProfile = null;
        }
      }
      // Dacă nu există userProfile sau nu există userName, cere din nou username-ul
      if (!userProfile || !userProfile.userName) {
        this.user = { userName: '' };
        this.service.getUserName().subscribe({
          next: (username: string) => {
            this.user.userName = username;
            localStorage.setItem('userProfile', JSON.stringify(this.user));
          },
          error: () => {
            this.user.userName = '';
          }
        });
      } else {
        this.user = userProfile;
        if (!this.user.userName) {
          this.user.userName = this.user.username || this.user.name || this.user.email || '';
        }
      }
    }
  }

  // Verifică dacă utilizatorul este logat
  isLog(): boolean {
    return this.service.isLogged();
  }

  // Funcția de logout
  onLogout(): void {
    this.service.logout();
    localStorage.removeItem('userProfile'); // Șterge profilul la logout
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

  getUserDisplayName(user: any): string {
    if (!user) return 'Guest';
    if (typeof user === 'string') return user;
    if (user.userName && typeof user.userName === 'string') return user.userName;
    if (user.username && typeof user.username === 'string') return user.username;
    if (user.fullName && typeof user.fullName === 'string') return user.fullName;
    if (user.name && typeof user.name === 'string') return user.name;
    // fallback: dacă e obiect, extrage prima proprietate string
    for (const key of ['userName','username','fullName','name']) {
      if (user[key] && typeof user[key] === 'object') {
        const val = Object.values(user[key]).find(v => typeof v === 'string');
        if (val) return val as string;
      }
    }
    return 'Guest';
  }
}